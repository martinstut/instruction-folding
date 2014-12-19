[back to README](README.md)

## Rationale for Text Folding in Instructions

### Text Size vs. Completeness

When you are writing **technical instructions for a non-technical audience**, e.g. about setting up an email client, addressing a group of entrepreneurs, you are in a **dilemma**:

1. The instructions should cover all the details and background information.
1. The instructions should be short, so people aren't intimidated by the size and can process them within a very short span of undivided attention.

If you write up all the details, the text gets too long. If you just write the key items, you're omitting required details for some trouble cases.

A solution to this dilemma is text folding: by default, display only the key items, but offer the reader a link or button "show details" which, when clicked, reveals additional information.

### Alternatives

Many instruction pages are offered to an audience having somewhat different environments, for instance

* Setting up an email account is a fairly generic concept, but the clicks required do differ from Thunderbird to Outlook.
* Products and web services are sold with varying components, but referred to by identical electronic manuals (web pages). Who hasn't read manuals like "On Windows Vista and 7, go to Start / All Programs / Vendor Name / Product Name. On Windows 8, unless you are using Classic Shell, switch to the tile menu, click on 'All Programs', locate the 'Vendor Name' group, ..."

Accomodating for all existing alternatives increases the size of the document (often doubling it), causes complex grammar and confuses readers about whether they should do A or B, just because they have a hard time (or no time, in case of fast reading) to decode whether "if this, but not that, except when having chosen option N" does or does not apply to them.

A solution is again text folding: offer a set of links or buttons corresponding to options, like "click this if you have Windows 7, click that if you have Windows 8." Of course the currently active option needs to be highlighted to indicate the fact that it is active.

