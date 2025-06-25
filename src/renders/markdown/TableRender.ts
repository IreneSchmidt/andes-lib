import { identate } from "../Identation";
import IRender from "../IRender";
import ParagraphRender from "./ParagraphRender";

export default class TableRender implements IRender
{
    private static enumeration: number = 0;

    private headers: string[];
    private rows: string[][];
    private description: string;
    private author: string;
    private numeration: number;

    public constructor(headers: string[] = [], rows: string[][] = [], description: string = "", author: string = "Autoria Própria")
    {
        this.headers = headers;
        this.rows = rows;
        this.description = description ? `: ${description}` : '';
        this.author = author;
        this.numeration = TableRender.enumeration;
        TableRender.enumeration++;
    }

    public addHeader(value: string, defaultValue: string = '')
    {
        this.headers.push(value);
        this.rows.forEach(row => row.push(defaultValue));
    }

    public render(identationStartLevel?: number): string
    {
        let description = this.renderDescription();
        let header = this.renderRow(this.headers);
        let rows = this.rows.map(row => this.renderRow(row)).join(`${identate(identationStartLevel)}${this.renderHLine()}\n`);
        let author = this.renderAuthor();

        return `\n${description}${identate(identationStartLevel)}${header}${rows}${author}`;
    }

    private renderDescription(): string
    {
        let paragraph = new ParagraphRender(`Tabela ${this.numeration}${this.description}`, "center");

        return paragraph.render();
    }

    private renderAuthor(): string
    {
        let paragraph = new ParagraphRender(`Autor: ${this.author}`, "center");

        return paragraph.render();
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

