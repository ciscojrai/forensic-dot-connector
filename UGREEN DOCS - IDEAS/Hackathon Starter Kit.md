This guide is for participants in the UGREEN NAS Skill Hackathon. Use the official UGOS Skill Creation Tool with your preferred AI assistant to create skills that can be used on UGREEN NAS / Uliya.

## 1\. Read Before You Start

By participating in this event and using the creation tool to develop skills, you confirm that you have read and agree to:

-   [User Agreement](https://api.ugnas.com/api/system/v1/ua/agreement/page?agreementCode=skillhub-user-agreement&acceptLanguage=en-US)
-   [Privacy Policy](https://api.ugnas.com/api/system/v1/ua/agreement/page?agreementCode=skillhub-privacy-policy&acceptLanguage=en-US)
-   [Skill Content Safety and Publishing Guidelines](https://api.ugnas.com/api/system/v1/ua/agreement/page?agreementCode=skillhub-publish-audit-spec&acceptLanguage=en-US)

Click the links above to read the full terms. You must comply with all of these agreements and guidelines when developing a skill.

## 2\. Set Up Your Creation Environment

Before you start, prepare an AI assistant and the official UGOS Skill Creation Tool.

The tool currently supports WorkBuddy, Claude, and Codex. For the best development experience, we recommend using one of these assistants whenever possible. Other environments may not support all tool features.

We recommend preparing:

-   One of the supported AI assistants above
-   A clear idea of what you want your skill to do
-   The official creation-tool archive provided with this guide

The creation tool helps you generate skill files and check them against the relevant requirements.

## 3\. Install the UGOS Skill Creation Tool

1.  Download the official creation tool provided with this guide. After extracting it, the folder will usually be named `uliya-skill-kit`.
    
    [Download the UGOS Skill Creation Tool](https://cdn.shopify.com/s/files/1/0630/9416/1602/files/uliya-skill-kit-0.7.7-en.zip?v=1794462613)
    
2.  Place the entire `uliya-skill-kit` folder in the skills directory used by your AI assistant. Directory names may vary slightly between assistants, so follow the skill-installation instructions for the assistant you are using.
3.  Reload or restart the assistant, then ask it questions such as:
    
    -   “What can I do with this tool?”
    -   “How do I start creating a UGREEN NAS skill?”
    -   “What capabilities are currently supported?”

If the assistant can answer these questions using the tool, installation is complete.

## 4\. Think It Through Before Generating

Before creating your skill, define these four things:

1.  **Who it is for:** for example, someone organizing family photos or archiving contracts.
2.  **When it should be used:** what a user might say to trigger the skill.
3.  **What result it should produce:** for example, a list, an album, meeting notes, or an organized directory.
4.  **What requires user confirmation:** for example, deleting, moving, or overwriting files.

Refer to the event page for topic requirements. Before generating any files, you can ask the assistant:

> “Do not generate any files yet. Help me check whether this idea is currently supported and suitable as a UGREEN NAS skill.”

Once you have confirmed that the idea is feasible, you can start creating the skill.

## 5\. Create a Skill

Describe what you want the skill to do in one clear sentence. For example:

-   Find duplicate files in the Downloads directory and, after confirmation, organize them into an archive directory.
-   Organize last year’s travel photos by person, time, and location, and create an album.
-   Transcribe today’s meeting recording and save it as meeting minutes.
-   Find this year’s contracts and invoices, extract key information, and organize them into an archive.
-   Check whether there were any unusual events in the garage this week and summarize the relevant details.

Then follow the assistant’s prompts to confirm the skill name and generate the skill folder.

Here is a complete example:

1.  “Do not generate any files yet. Help me check whether this is currently supported and suitable as a UGREEN NAS skill: find duplicate files in the Downloads directory and, after confirmation, organize them into an archive directory.”
2.  Once it is confirmed feasible, say: “Help me make a skill based on the requirement above.”
3.  Confirm a skill name, such as `download-dedup-archive` (lowercase English words with hyphens are recommended).
4.  “Generate the skill files according to the guidelines.”
5.  “Help me check this skill.”
6.  Make the requested changes, then check it again until there are no required changes remaining.

The generated folder is typically structured as follows:

```vbnet
your-skill-name/
├── SKILL.md         Required. Describe what it does, when to use it, how it works, and how to handle missing results or actions requiring confirmation.
├── README.md        Recommended. Explain in more conversational language who it is for and how to use it.
└── references/      Optional. Supplementary documentation.
```

When creating a skill, keep the following requirements in mind:

-   Define the intended result clearly before generating the skill.
-   Only use capabilities that are actually supported on UGREEN NAS. Do not invent unsupported features.
-   Each step must use the actual output of the previous step. Avoid vague references such as “that directory from before.”
-   Ask for user confirmation before deleting, moving, overwriting, or sending or sharing content externally.
-   If no result is found, say so clearly and stop. Do not substitute similar or unrelated content.
-   Do not include sensitive information such as account credentials, passwords, or keys.
-   Do not include scripts, executable files, or undisclosed external downloads.
-   Do not leave TODOs, “TBD,” or placeholder content in the finished skill.
-   Your skill must be your own original work. Do not reuse another person’s skill or core content without authorization.

If you need to change the requirements, simply tell the assistant: “Update the skill according to these new requirements,” then check it again. Write the flow completely so it is not a half-finished product: another person should be able to understand how the skill proceeds from trigger to result.

## 6\. UGOS Skill Capability Scope

You can currently create skills around the following UGREEN NAS capabilities. More capabilities will be added over time; the capabilities included in the creation-tool archive take precedence. Below are common directions and example combinations:

| Area | What you can do | Example use case |
|---------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Files | Find, browse, organize, deduplicate, and tag | Deduplicate the Downloads directory, then archive files after confirmation |
| Albums | Find photos by person, location, or time; create or organize albums | Create a travel album from photos of the beach and the children |
| Documents | Read, answer questions, extract information, translate, and reconcile | Extract project information from contracts and invoices |
| Knowledge | Look up official documentation, transcribe recordings, and save text | Transcribe a meeting recording into minutes and save it |
| Video / Music | Search content, control playback, and find subtitles | Find a movie and check whether subtitles are available |
| Surveillance | Query camera events and organize related details | Check whether there were any unusual events in the garage during a given period |

You can also chain multiple areas together, such as “find files first, then read documents, then organize them into an archive.” Every step must map to a real capability listed above.

If you are unsure whether something can be done, ask the assistant directly:

-   “Is this capability currently supported?”
-   “Can organizing albums and finding files be combined?”

Follow the tool’s own documentation; do not add capabilities that are not listed there.

## 7\. Testing Your Skill

After generating your skill, test and review it using the following steps:

1.  ### Check it with the creation tool
    
    Tell the assistant: “Help me check this skill.”
    
    If required changes are identified, make the changes and check the skill again until no required changes remain.
    
2.  ### Review it from a user’s perspective
    
    Read through the entire skill yourself. Check whether another user could clearly understand what it does, when to use it, how each step works, and what happens when no result is found or confirmation is required.
    
    After revising it, you can also ask the assistant: “What could be made clearer?”
    
3.  ### Test it on a real device (finalists only)
    
    The official NAS test environment is provided only to participants who advance to the final round.
    
    If you are a finalist, follow the instructions on the event page. In the official NAS test environment, trigger the skill using a sentence a real user might say and check that the complete flow works as intended.
    

Common issues found during checking include:

-   An incomplete skill name or description, or one that does not match the actual workflow
-   Use of capabilities that are not currently supported
-   Missing user confirmation before high-risk actions
-   Placeholder content or sensitive information that should not be included
-   A file structure, file size, or required document that does not comply with the guidelines

## 8\. Required Compliance

Please read the [Skill Content Safety and Publishing Guidelines](https://api.ugnas.com/api/system/v1/ua/agreement/page?agreementCode=skillhub-publish-audit-spec&acceptLanguage=en-US) in full. During development, pay particular attention to:

-   The skill name and description must accurately reflect what the skill does. Do not exaggerate its capabilities or present it as an official UGREEN skill.
-   Do not include keys or tokens, or instruct users to execute unknown or untrusted code.
-   Do not access content without the user’s authorization or transmit user data externally without their knowledge.
-   Inform the user and obtain confirmation before performing high-risk actions.
-   Only use content and resources that you have the right to use. Skills must be original and must not reuse another person’s work without authorization.