import { EpicClass, StoryClass } from "../../../model/made/BacklogClass";
import { NameSpaceSimpleItemRender, NameSpaceSimpleMultStringItemRender, NameSpaceSimpleStringItemRender } from "../NameSpaceItemRender";
import NameSpaceRender from "../NameSpaceRender";
import MadeTaskRender from "./MadeTaskRender";


export class MadeStoryRender extends NameSpaceRender
{
    public constructor(story: StoryClass)
    {
        super("story", story.name, [
            new NameSpaceSimpleStringItemRender("name", story.name),
            new NameSpaceSimpleMultStringItemRender("Criterions", story.criterions),
            new NameSpaceSimpleStringItemRender("observation", story.observations),

            ...story.tasks.map(t => new MadeTaskRender(t)),
        ]);
    }
}


export class MadeEpicRender extends NameSpaceRender
{
    public constructor(epic: EpicClass)
    {
        super("epic", epic.identifier, [
            new NameSpaceSimpleItemRender("name", epic.identifier),
            new NameSpaceSimpleItemRender("process", epic.)
        ]);
    }
}


export default class MadeBacklogRender extends NameSpaceRender
{

}

