import IRender from "../IRender";

export default class MadeEpicDependencie implements IRender{
    private depends: string[];
    
    public render(identationStartLevel?: number): string {
        throw new Error("Method not implemented.");
    }
}