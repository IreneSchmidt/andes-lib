import { Project } from "../../model/models";
import { identate } from "../Identation";
import IRender from "../IRender";


export default class SparkConfiguration implements IRender
{

    private softwareName: string;
    private about: string;
    private language: string;

    public constructor(softwareName: string, description: string, language: string)
    {
        this.softwareName = softwareName;
        this.about = description;
        this.language = language;
    }

    public render(identationStartLevel: number = 0  ): string
    {
        let softwareName = this.appendRow(identationStartLevel+1, this.renderSoftwareName());
        let about = this.appendRow(identationStartLevel+1, this.renderAbout());
        let language = this.appendRow(identationStartLevel+1, this.renderLanguage());

        return `${identate(identationStartLevel)}Configuration {${softwareName}${about}${language}\n${identate(identationStartLevel)}}`;
    }

    private appendRow(identationLevel: number, data: string): string
    {
        return `\n${identate(identationLevel)}${data}`;
    }

    private renderSoftwareName(): string
    {
        return `software_name: "${this.softwareName}"`;
    }

    private renderAbout(): string
    {
        return `about: "${this.about}"`;
    }

    private renderLanguage(): string
    {
        return `language: ${this.language}`;
    }
}

