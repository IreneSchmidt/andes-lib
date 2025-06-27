import IRender from "../IRender";
import { identate } from "../Identation";
import MadeEpic from "./MadeEpic";
import MadeItem from "./MadeItem";
import MadeTask from "./MadeTask";

export default class SprintBacklog implements IRender{
    private header: string;
    private items: MadeItem[];

    public constructor(header: string, items: MadeItem[]) {
        this.header = header;
        this.items = items;
    }

    public render(identationStartLevel: number = 0): string {
        let declaration = `${identate(identationStartLevel)}${this.renderHeader()}`
        let items = `${identate(identationStartLevel)}${this.renderItems()}`

        return `${declaration} {
            ${items}
        }`
    }

    private renderHeader():string{
        return `team ${this.header}`;
    }

    private renderItems():string{
        return this.items.map(item => item.render()).join('\n');
    }
}