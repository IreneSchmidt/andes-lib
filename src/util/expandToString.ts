const SNLE = '$$SNLE$$'; // String representing newlines in substitutions
const EOL = '\n'; // End of line character

// Regular expression to split strings into lines while handling different line endings
const NEWLINE_REGEXP = /\r?\n/;

/**
 * Converts any value to its string representation.
 * @param value The value to convert to string
 * @returns The string representation
 */
function toString(value: unknown): string {
    if (value === undefined || value === null) {
        return SNLE;
    }
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
        return String(value);
    }
    if (value instanceof Error) {
        return value.message;
    }
    if (typeof value === 'object') {
        try {
            return JSON.stringify(value);
        } catch {
            return Object.prototype.toString.call(value);
        }
    }
    return SNLE;
}

/**
 * Aligns a substitution string with the current accumulated string.
 * @param substitution The substitution string to align
 * @param current The current accumulated string
 * @returns The aligned substitution string
 */
function align(substitution: string, current: string): string {
    if (substitution === SNLE) {
        return SNLE;
    }
    const lines = current.split(NEWLINE_REGEXP);
    const lastLine = lines[lines.length - 1];
    const indent = lastLine.match(/^\s*/)?.[0] ?? '';
    return substitution.replace(/\n/g, '\n' + indent);
}

/**
 * Finds the minimum indentation level across all non-empty lines.
 * @param lines The lines to analyze
 * @returns The number of spaces in the minimum indentation
 */
function findIndentation(lines: string[]): number {
    let indent = Infinity;
    for (const line of lines) {
        if (line.trim().length === 0) {
            continue;
        }
        const lineIndent = line.match(/^\s*/)?.[0].length ?? 0;
        if (lineIndent < indent) {
            indent = lineIndent;
        }
        if (indent === 0) {
            break;
        }
    }
    return indent === Infinity ? 0 : indent;
}

/**
 * Internal function to expand a template string with substitutions.
 * @param lineSep The line separator to use
 * @param staticParts The static parts of the template string
 * @param substitutions The dynamic substitutions
 * @returns The expanded string
 */
function internalExpandToString(lineSep: string, staticParts: TemplateStringsArray, ...substitutions: unknown[]): string {
    let lines = substitutions
        // align substitutions and fuse them with static parts
        .reduce((acc: string, subst: unknown, i: number) => acc + (subst === undefined ? SNLE : align(toString(subst), acc)) + (staticParts[i + 1] ?? ''), staticParts[0])
        // converts text to lines
        .split(NEWLINE_REGEXP)
        .filter(l => l.trim() !== SNLE)
        // whitespace-only lines are empty (preserving leading whitespace)
        .map(l => l.replace(SNLE, '').trimEnd());

    // Handle single line templates with leading/trailing terminators on separate lines
    const containsLeadingLinebreak = lines.length > 1 && lines[0].trim().length === 0;
    lines = containsLeadingLinebreak ? lines.slice(1) : lines;

    const containsTrailingLinebreak = lines.length !== 0 && lines[lines.length-1].trimEnd().length === 0;
    lines = containsTrailingLinebreak ? lines.slice(0, lines.length-1) : lines;

    // finds the minimum indentation
    const indent = findIndentation(lines);
    return lines
        // shifts lines to the left
        .map(line => line.slice(indent).trimEnd())
        // convert lines to string
        .join(lineSep);
}

/**
 * Expands a template string with substitutions, similar to a tagged template literal.
 * @param staticParts The static parts of the template string
 * @param substitutions The dynamic substitutions
 * @returns The expanded string
 */
export function expandToString(staticParts: TemplateStringsArray, ...substitutions: unknown[]): string {
    return internalExpandToString(EOL, staticParts, ...substitutions);
}

/**
 * Expands a template string with substitutions and ensures it ends with a newline.
 * @param staticParts The static parts of the template string
 * @param substitutions The dynamic substitutions
 * @returns The expanded string with trailing newline
 */
export function expandWithNewLines(staticParts: TemplateStringsArray, ...substitutions: unknown[]): string {
    return expandToString(staticParts, ...substitutions) + EOL;
}