import { Team, TeamMember } from "../../model/madeModels";


export const member1: TeamMember = {
    name: "Team Member 1",
    identifier: "TeamMember1",
    discord: "someDiscord",
    email: "some.email@domain.com"
}


export const member2: TeamMember = {
    name: "Team Member 2",
    identifier: "TeamMember2",
    discord: "someDiscord",
    email: "some.email@domain.com"
}


export const team: Team = {
    identifier: "BlackOps",
    name: "Black Ops",
    description: "Description Team",
    members: [member1, member2]
}

