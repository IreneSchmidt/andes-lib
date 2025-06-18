import { identate } from "../Identation";
import IRender from "../IRender";

export default class TableRender implements IRender
{
    private headers: string[];
    private rows: string[][];

    public constructor(headers: string[] = [], rows: string[][] = [])
    {
        this.headers = headers;
        this.rows = rows;
    }

    public addHeader(value: string, defaultValue: string = '')
    {
        this.headers.push(value);
        this.rows.forEach(row => row.push(defaultValue));
    }

    public render(identationStartLevel?: number): string
    {
        let header = this.renderRow(this.headers);
        let rows = this.rows.map(row => this.renderRow(row)).join(`${identate(identationStartLevel)}${this.renderHLine()}\n`);

        return `${identate(identationStartLevel)}${header}${rows}`;
    }

    private renderRow(values: string[]): string
    {
        return `|${values.join("|")}|`;
    }

    private renderHLine(): string
    {
        return `|${'-|'.repeat(this.headers.length)}`;
    }
}

