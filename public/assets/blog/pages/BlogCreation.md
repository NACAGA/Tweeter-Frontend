---
title: Blog Creation
date: 7/30/2023
tags: ["Blog"]
---

When creating this website, I knew I wanted a way to share off more detailed look at some of my code and projects - separate from the main content of the site. I decided to do this in the form a blog. Ideally, this would allow me to easily create new pages and update my website.

When creating the infrastructure for the blog setup, I had the following requirements:

1. Blog pages should be simple to create, while having as much flexibility as possible.
2. Blog pages need to contain metadata for important information like titles, creation dates, tags, etc.
3. There needs to be a landing page that will show an autopopulated list of every blog page.

### Rendering Markdown

To meet the first requirement, I briefly considered building an interface for creating Blog Pages into the website itself. However, that idea was quickly scrapped because (1) it was entirely too much work for what I was trying to do and (2) updating the content of the website dynamically would have required me to host the website myself (currently, my website is hosted using GitHub Pages). So instead, I decided to write my blog pages in markdown[^1] and then use that markdown to render each blog page.

[^1]: Markdown is a simple syntax for formatting text. You can learn more [here](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax/).

To actually render the markdown, I used a library called [mui-markdown](https://www.npmjs.com/package/mui-markdown). This library included a React Component that would parse markdown and render it using MaterialUI components. All I had to do was override some the default components to better match the style I was going for.

### Adding Metadata

After getting markdown to render, I started working on adding metadata to my pages. Ideally, I wanted to a way to add that metadata directly into the markdown files, instead of defining it in some separate location. And, with a little Googling, a stumbled on a solution named [frontmatter](https://www.npmjs.com/package/@github-docs/frontmatter). This is a (relatively) standard way of adding YAML metadata to the beginning of a markdown file. All you have to do is create a section at the top of your markdown file that looks like this:

```yaml
---
metadata: Goes Here
---
```

After having a method to insert metadata into my markdown, I initially decided that each page would have metadata on its title, author, and creation date. I then returned to my markdown renderer component and edited it to display that information.

Later on in the project, I also added default values for each of the metadata fields. This means that I could add new metadata fields without breaking all my previously created pages and that I could exclude certain fields from pages if its value matched the default value.

### Tying it All Together

Now that I had created the fundamental features for creating individual blog pages, I had to create a way to display a list of all of those pages. My first approach was to hardcode the locations of each markdown file into a list. Then, when the client loaded the page, they would fetch each of the pages, parse them to get their metadata, and then display that metadata in a list. While this approach worked in the short term, it obviously wasn't good idea to make the client fetch every single page. This lead me to search for ways to get the metadata at compile-time.

#### Babel Macros

My solution to this issue came in the form of a library called [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros). This library allows you to write node.js code that gets executed at compile time. For example, if I wanted to evaluate pi / 2 at compile time, I could using the following code:

```js
import preval from "preval.macro";
const HALF_PI = eval`3.1415926535 / 2`;
```

I used this library to read all of the blog pages in a certain folder and use them to populate a list of every page's metadata. Then, the client uses that metadata to create the list of every blog page. Only when a page is opened does the client actually fetch the contents of the page.

#### Tags

As a final touch, I wanted a way to filter what blog pages you could see in the list. To do this, I added the ability to add "tags" to a blog page. These tags lived in the pages metadata and would appear next to the title on the list of pages. I then added a input field where you could select the tags you want to filter by to the home page for the blog. Finally, I also added the ability to add tag filters to the url, so I can directly link to just the pages with a certain tag. For eaxmple, [this](https://garethfultz.com/?tag=Blog#/blog/) should link you to just the pages that have the "Blog" tag applied.

### Wrap-up

If you want to check out the source code of this website, you can do that [here](https://github.com/Clicky02/portfolio-website). There's a good bit of detail I left out of this summary, so if you want to see the code or history itself, I'd recommend checking it out.
