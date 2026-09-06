# Drop-in CLAUDE.md for the original taste-skill

This is a boost file for people using the **original** [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (`design-taste-frontend`). You do not need this repo's v3 skill to use it.

## What it does

The original taste-skill is a large, strong rule set, but it leaves two things to chance:

- Its most important rules (the em-dash ban, eyebrow restraint, serif discipline, palette rotation) are marked as "most-violated" *inside* an 85 KB document, so in practice the agent still misses them.
- Its variety rules are written as things to **check after the fact** (the Section-Layout-Repetition Ban, the hero-paradigm list). By the time the agent audits, it has already reached for its safe defaults, so every page still rhymes.

This `CLAUDE.md` fixes both without changing the skill. Claude Code reads a project's `CLAUDE.md` every session, so dropping this file into your project root makes the agent:

1. Post a **hero paradigm + section plan before writing any markup**, turning the skill's passive variety rules into an active up-front declaration.
2. Treat the skill's own most-violated rules as **hard gates** at the top of context instead of buried lines.

Every rule in the file points at a section that already exists in the original skill. It invents no new policy, and it references only sections that are actually present in the current skill (verified). It stays honest about what the skill can and cannot do.

## How to use

1. Install or paste the original taste-skill as usual.
2. Copy `CLAUDE.md` from this folder into your project root.
3. Start a Claude Code session and give it your brief. The agent will post the design read, dials, hero paradigm, and section plan, then stop for your OK before writing code.

That plan-review moment is the whole point. If the plan looks like hero + card grid + zigzag + logo wall + CTA, that is the safe-default page the skill is trying to avoid. Push back there (different hero, one structural section, reroll) before a line of JSX exists.

## Note

This is an independent add-on, not affiliated with or endorsed by the original taste-skill author. Original skill is MIT; credit for every referenced rule belongs to that project.
