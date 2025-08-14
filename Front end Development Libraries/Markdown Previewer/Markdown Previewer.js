const {useState} = React;

const defaultMarkdown = `
# Heading H1
## Sub-heading H2
[This is a link](https://www.freecodecamp.org)
\`Inline code\`
\`\`\`
Code block
function hello() {
  console.log("Hello, world!");
}
\`\`\`
- List item 1
- List item 2
> Blockquote
![React Logo](https://reactjs.org/logo-og.png)
**Bold text**
`;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  
  const handleChange = (e) => setMarkdown(e.target.value);
  
  return (
    <div className="container">
      <h1>Markdown Previewer</h1>
      <div className="panel">
        <h3>Editor</h3>
        <textarea id="editor" value={markdown} onChange={handleChange}></textarea>
      </div>
      <div className="panel">
        <h3>Preview</h3>
        <div id="preview" dangerouslySetInnerHTML={{ __html: marked(markdown, { breaks: true }) }}></div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
