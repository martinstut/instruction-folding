# Text Folding by JavaScript for Instructions

## [Rationale](rationale.md)

[see sperate file rationale.md](rationale.md)

## Implementation Goals

In current web technology we have standardized JavaScript logic and DOM (Document Object Model) structure to selectively show or hide portions of text in web pages. But somehow the browser needs to know what to show and what to hide, so there needs to be some markup.

Nowadays many web authors need to edit HTML inside Content Management Systems, so the markup needs to be compatible with a restricted subset of HTML. Adding some SPANs or DIVs might be the most one can do.

A possible solution to this are class names. Every HTML node can be member of zero or more classes, using code like `<ol class="class1 class2 class3"> ... </ol>`

This is what I've implemented.

## Using the code

Here is what you need to do to use this code:

### Add the JavaScript Code

Insert this line anywhere in the HTML file, preferably in the head section or at the end of the body section:

`<script type="text/javascript" src="instruction-folding.js"></script>`

### Define Conditional Sections

The JavaScript code implements a variable-value model to specify which sections should be shown or not. A section is shown if

* either there is no condition specified (standard case for text that is shown always)
* or the current value of the given variable matches one of the values specified by the HTML node's classes.

**If you want to show a section only if variable var has value `val`, then assign it the class `if-var-val` .**

If you want to show a section if variable `var` has either value `val1` or value `val2`, then assign it to multiple classes `if-var-val1 if-var-val2` . You can also use more than two classes.

**Variable names and values must not contain dashes**, if-windows-version-windows-8 is doubly non-functional (variable name contains a dash, value contains a dash). Any character permissible in a class name is acceptable, but for clarity, you should restrict yourself to lower case letters and digits.

#### Example

    <p class="if-windowsversion-vista if-windowsversion-7">
    This text will be displayed for Windows Vista or Windows 7, but will be hidden for Windows 8.
    </p>

### Define Setting Links

To set variable `var` to value `val`, the user needs to click on an HTML node having the `set-var-val` class. This will add `onclick` code to this HTML node.
After clicking on a setter node, the clicked node will additionally be assigned to the `setter-active` class. This can be used as a CSS selector to highlight the currently active value.

It you want a certain setter to contain the default value that's effective before any setter is clicked, assign it to the class `var-default` . This will act as if this setter is being clicked right after the page is loaded.

#### Example

    <p>Select your computer's operating system:
    <strong class="setter set-windowsversion-vista">Windows Vista</strong>
    <strong class="setter set-windowsversion-7 var-default">Windows 7</strong>
    <strong class="setter set-windowsversion-8">Windows 8</strong></p>

This offers a choice of Windows Vista, 7 and 8, with Windows 7 being the default.

The `setter` class has no influence on the hiding logic, but is useful as a CSS selector to highlight areas that can be clicked on. It could have any other name.

## Future Work

IMO the "show/hide explanation" use case requires too much HTML code. It should be easier than now for the author to write such cases.

