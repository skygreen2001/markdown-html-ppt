
/**
 * 将markdown html format转换成revealjs html format
 * encodeType: markdown to html方式
 * 1: marked   - https://github.com/chjj/marked
 * 0: markdown - https://github.com/evilstreak/markdown-js
 */
function markdown2revealjs( markdown_html_content, encodeType ) {
  var encodeType = encodeType || 1;
  var html = markdown_html_content;
  if (encodeType == 1){
    html = html.replace(new RegExp("\n","gm"),"\n                    ");
    html = '<section data-background="white">\n                    <section>\n                    ' + html;

    html = html.replace(/<h2 id=".*">(.*)<\/h2>/gi, '</section>\n                </section>\n            <h2>$1</h2>');
    html = html.replace(/<h2>(.*)<\/h2>/gi, '\n                <section role="$1">\n                    <section data-background="#4d7e65" data-background-transition="slide">\n                    <h2>$1</h2>');
    html = html.replace(/<h3 id=".*">(.*)<\/h3>/gi, '\n                    </section>\n            <h3>$1</h3>');
    html = html.replace(/<h3>(.*)<\/h3>/gi, '\n                    <section data-background="white">\n                    <h3>$1</h3>');

    html = html.replace(/<pre><code(.*)>(.*)/mgi, '<pre><code data-trim contenteditable$1>\n                    $2');

    html = html.replace(/<li>/gi, '    <li>');

    html = html + '\n                    </section>\n                </section>\n';

    html = html.replace(new RegExp("<blockquote>","gm"),"");
    html = html.replace(new RegExp("</blockquote>","gm"),"");
    html = html.replace(new RegExp("<p><strong>","gm"),"<h2>");
    html = html.replace(new RegExp("</strong></p>","gm"),"</h2>");
  } else {
    // parse the markdown into a tree and grab the link references
    // var tree = md.parse( content );
    // var html = md.renderJsonML( md.toHTMLTree( tree ) );
    // console.log(tree);

    // fs.writeFile(__dirname + '/demo/'+baseName+'.html', html, (err) => {
    //   if (err) throw err;
    //   console.log('The file has been saved!');
    // });

    html = html.replace(new RegExp("\n","gm"),"\n                    ");
    html = '<section data-background="white">\n                    <section>\n                    ' + html;

    html = html.replace(/<h2>(.*)<\/h2>/gi, '</section>\n                </section>\n            <h2>$1</h2>');
    html = html.replace(/<h2>(.*)<\/h2>/gi, '\n                <section role="$1">\n                    <section data-background="#4d7e65" data-background-transition="slide">\n                    <h2>$1</h2>');
    html = html.replace(/<h3>(.*)<\/h3>/gi, '\n                    </section>\n            <h3>$1</h3>');
    html = html.replace(/<h3>(.*)<\/h3>/gi, '\n                    <section data-background="white">\n                    <h3>$1</h3>');

    html = html.replace(/<p><code><\/code>`/mgi, '<p><code>');
    html = html.replace(/<code><\/code>`<\/p>/mgi, '<\/code><\/p>');
    html = html.replace(/<\/p>(\s*)<pre><code>/mgi, '$1    ');
    html = html.replace(/<\/code><\/pre>(\s*)<p>/mgi, '$1');

    html = html.replace(/<p><code>\w*/mgi, '<pre><code data-trim contenteditable>');
    html = html.replace(/<\/code><\/p>/gi, '<\/code><\/pre>');
    html = html.replace(/<(\/)?em>/mgi, '*');
    html = html.replace(/<\/p>(\s+)<p>/mgi, '$1');

    html = html.replace(/<\/ul>/gi, '\n                    </ul>');
    html = html.replace(/<li>/gi, '\n                        <li>');

    html = html + '\n                    </section>\n                </section>\n';

    html = html.replace(new RegExp("<blockquote>","gm"),"");
    html = html.replace(new RegExp("</blockquote>","gm"),"");
    html = html.replace(new RegExp("<p><strong>","gm"),"<h2>");
    html = html.replace(new RegExp("</strong></p>","gm"),"</h2>");
  }
  return html;
}
