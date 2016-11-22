import React, { Component } from 'react';
// eslint-disable-next-line
import ReactDOM from 'react-dom';
import {CompositeDecorator,
        ContentBlock,
        ContentState,
        Editor,
        EditorState,
        convertFromHTML,
        convertFromRaw,
        convertToRaw,
        RichUtils} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';


import logo from './logo.svg';
import ToolBar from './component/toolbar'
import './App.css';

const styles = {
    root: {
      fontFamily: '\'Helvetica\', sans-serif',
      padding: 20,
      width: 600,
    },
    editor: {
      border: '1px solid #ccc',
      cursor: 'text',
      minHeight: 80,
      padding: 10,
      marginLeft: 10,
      marginRight: 10
    },
    pushbutton: {
      marginTop: 10,
      textAlign: 'center',
    },
    spancss:{
      border: '1px dashed black',
      float: 'left',
      position: 'relative',
      marginLeft: 10,
      padding: 10,
      width: '100%'
      // marginTop: 100,
      // width: 500
    }
  };

// function findLinkEntities(contentState, contentBlock, callback) {
//     contentBlock.findEntityRanges(
//       (character) => {
//         const entityKey = character.getEntity();
//         return (
//           entityKey !== null &&
//           contentState.getEntity(entityKey).getType() === 'LINK'
//         );
//       },
//       callback
//     );
//   }
//
// function findImageEntities(contentState, contentBlock, callback) {
//   contentBlock.findEntityRanges(
//     (character) => {
//       const entityKey = character.getEntity();
//       return (
//         entityKey !== null &&
//         contentState.getEntity(entityKey).getType() === 'IMAGE'
//       );
//     },
//     callback
//   );
// }
//
// const Image = (props) => {
//   const {
//     height,
//     src,
//     width,
//   } = props.contentState.getEntity(props.entityKey).getData();
//
//   return (
//     <img src={src} height={height} width={width} />
//   );
// };
//
// const Link = (props) => {
//   const {url} = props.contentState.getEntity(props.entityKey).getData();
//   return (
//     <a href={url} style={styles.link}>
//       {props.children}
//     </a>
//   );
// };
//
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.handleKeyCommand = this.handleKeyCommand.bind(this);

    // const decorator = new CompositeDecorator([
    //   {
    //     strategy: findLinkEntities,
    //     component: Link,
    //   },
    //   {
    //     strategy: findImageEntities,
    //     component: Image,
    //   },
    // ]);

    const sampleMarkup =
    //   // '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
    //   // '<a href="http://www.facebook.com">Example link</a><br /><br/ >' +
    //   // '<img src="image.png" height="112" width="200" />';
      "<p><strong>abc</strong> <sub>haha</sub></p>";

    // const blocksFromHTML = convertFromHTML(sampleMarkup);
    // console.log(" blocksFromHTML: ", blocksFromHTML);
    // const state = ContentState.createFromBlockArray(
    //   blocksFromHTML.contentBlocks,
    //   blocksFromHTML.entityMap
    // );
    // const state = ContentState.createFromText("<b>Haha</b>");
    //
    // console.log("state: ", state);
    // //
    // let cts_export = stateToHTML(state);
    // console.log("cts_export: ", cts_export);

    let cts_import = stateFromHTML(sampleMarkup);
    // console.log("cts_import: ", cts_import);

    this.state = {
      editorState1: EditorState.createEmpty(),
      editorState2: EditorState.createEmpty(),
      editorState3: EditorState.createEmpty()

      // editorState: EditorState.createWithContent(
      // // editorState: EditorState.createEmpty()
      //   cts_import)
    };

    this.pushString = "";

    this.focus1 = this.focus1.bind(this);
    this.focus2 = this.focus2.bind(this);
    this.onChange1 = this.onChange1.bind(this);
    this.onChange2 = this.onChange2.bind(this);
  }

  onChange2(editorState){
    let cts_export = stateToHTML(editorState.getCurrentContent());
    this.pushString = decodeHtml(cts_export);
    console.log("Pushed string: ", this.pushString);
    this.setState({editorState2: editorState});

    let ctx_import = stateFromHTML(this.pushString);
    // var tempState = EditorState.createWithContent(ctx_import);
    var editS = EditorState.push(this.state.editorState3, ctx_import);
    this.setState({editorState3: editS});
    var spanDOM = document.getElementById("spantext");
    spanDOM.innerHTML = this.pushString;
  }

  onChange1(editorState){
    let cts_export = stateToHTML(editorState.getCurrentContent());
    // this.pushString = decodeHtml(cts_export);
    console.log("Pushed cts_export: ", cts_export);
    this.setState({editorState1: editorState});

    let ctx_import = stateFromHTML(cts_export);
    var tempState = EditorState.createWithContent(ctx_import);
    var editS = EditorState.push(this.state.editorState3, ctx_import);
    this.setState({editorState3: editS});
    var spanDOM = document.getElementById("spantext");
    spanDOM.innerHTML = cts_export;
  }

  focus1(){
    this.refs.editor1.focus();
  }

  focus2(){
    this.refs.editor2.focus();
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState1, command);
    if (newState) {
      this.onChange1(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  componentDidMount(){
    this.focus1();
  }
  render() {
    var self = this
    const {editorState1, editorState2, editorState3} = this.state;
    // const raw = convertToRaw(this.state.editorState.getCurrentContent());
    // console.log("raw: ", raw, "JSON: ", JSON.stringify(raw));

    // handleKeyCommand = {this.handleKeyCommand}
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Draft.js demo by Thinh Tan</h2>
        </div>
        <div id="style_area">

          <br />
          [This is the Draft js Editor to recieve HTML code]
          <br /><br />
          <div style={styles.editor} onClick={this.focus2}>

            <Editor
                editorState={editorState2}
                placeholder="Enter something to push HTML code..."
                handleKeyCommand = {this.handleKeyCommand}
                ref="editor2"
                onChange={this.onChange2} />

          </div>
          <br />
          [This is the Draft js Editor to input text]
          <ToolBar
            onChange = {this.onChange1}
            editorState = {this.state.editorState1}
          />
          <div style={styles.editor} onClick={this.focus1}>

            <Editor
                editorState={editorState1}
                placeholder="Enter something to push text..."
                handleKeyCommand = {this.handleKeyCommand}
                ref="editor1"
                onChange={this.onChange1} />

          </div>
          <br />
          [This is the Draft js Editor to recieve text]
          <br /><br />
          <div style={styles.editor}>

            <Editor
                editorState={editorState3}
                placeholder="Text will be displayed when being typed on the box above..."
                ref="editor3"
                onChange={this.onChange3}/>


          </div>
          <br />
          [This is the span HTML component]
          <br />
          <span id="spantext" style={styles.spancss}>a</span>

        </div>
      </div>
    );
  }
}

export default App;
