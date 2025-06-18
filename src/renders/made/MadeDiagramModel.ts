import IRender from "../IRender";

export default class MadeDiagramModel implements IRender{
    public render(identationStartLevel?: number): string {
        throw new Error("Method not implemented.");
    }
}