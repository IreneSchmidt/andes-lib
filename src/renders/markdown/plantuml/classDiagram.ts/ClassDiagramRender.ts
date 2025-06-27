import IRender from "../../../IRender";
import PlantUmlRender from "../PlantUmlRender";

export default class ClassDiagramRender extends PlantUmlRender
{
    private objects: IRender[];
    
    public constructor(objects: IRender[] = [])
    {
        super();
        this.objects = objects;
    }

    public pumlRender(identationLevel: number = 0): string
    {
        return this.objects.map(obj => obj.render(identationLevel+1)).join("\n");
    }
}