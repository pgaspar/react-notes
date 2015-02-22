var NoteApp = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },

  componentDidMount: function() {
    this.setState({ data: this.props.data });
    this.showNote(this.props.data[0]);
  },

  handleSearch: function(query) {
    // This should eventually search for stuff
    var notes = this.state.data;
    var newNotes = [ { title: query, body: '' } ].concat(notes);
    this.setState({ data: newNotes });
    this.showNote(newNotes[0]);
  },

  handleNoteSave: function(old_note, new_note) {
    var updatedNotes = this.state.data;
    updatedNotes.splice(updatedNotes.indexOf(old_note), 1);
    updatedNotes = [new_note].concat(updatedNotes);
    this.setState({ data: updatedNotes });
  },

  showNote: function(note) {
    var evt = new CustomEvent('noteSelected', {
      detail: { note: note }
    });
    window.dispatchEvent(evt);
  },

  render: function() {
    var firstNote = this.state.data[0];
    if (!firstNote) {
      firstNote = { title: '', body: '' };
    }
    return (
      <div className="noteApp">
        <NoteSearch onSearch={this.handleSearch} />
        <NoteList data={this.state.data} />
        <hr />
        <NoteEditable note={firstNote} onChange={this.handleNoteSave} />
      </div>
    );
  }
});

var NoteSearch = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var query = this.refs.query.getDOMNode().value.trim();
    if (!query) {
      return;
    }
    this.props.onSearch(query);
    this.refs.query.getDOMNode().value = '';
  },

  render: function() {
    return (
      <div className="noteSearch">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Add a new note..." ref="query" />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
});

var NoteList = React.createClass({
  render: function() {
    var noteItems = this.props.data.map(function (note) {
      return (
        <NoteItem note={note} />
      );
    });
    return (
      <div className="noteList">
        <ul>
          {noteItems}
        </ul>
      </div>
    );
  }
});

var NoteItem = React.createClass({
  handleNoteSelection: function(e) {
    e.preventDefault();
    var evt = new CustomEvent('noteSelected', {
      detail: {
        note: this.props.note,
      }
    });
    window.dispatchEvent(evt);
  },

  render: function() {
    var summary_style = {
      color: '#BBB',
      marginLeft: '5px',
    };
    return (
      <div className="noteItem">
        <li>
          <a href="#" onClick={this.handleNoteSelection}>
            {this.props.note.title}
          </a>
          <span style={summary_style}>({this.props.note.body.length})</span>
        </li>
      </div>
    );
  }
});

var NoteEditable = React.createClass({
  getInitialState: function() {
    return {
      note: {}
    };
  },

  componentDidMount: function() {
    this.setState({ note: this.props.note });
    window.addEventListener('noteSelected', this.updateNoteContent);
  },

  updateNoteContent: function(e) {
    this.setState({ note: e.detail.note });
    this.refs.body.getDOMNode().focus();
  },

  handleBodyChange: function(e) {
    var newNote = {
      title: this.state.note.title,
      body: e.target.value
    };
    this.props.onChange(this.state.note, newNote);
    this.setState({ note: newNote });
  },

  handleTitleChange: function(e) {
    var newNote = {
      title: e.target.value,
      body: this.state.note.body
    };
    this.props.onChange(this.state.note, newNote);
    this.setState({ note: newNote });
  },

  render: function() {
    var input_styles = {
      fontSize: '20px'
    };
    var textarea_styles = {
      width: '100%',
      height: '50%',
      borderColor: '#DDD'
    };
    return (
      <div className="noteEditable">
        <form className="noteEditForm" onSubmit={this.handleSubmit}>
          <input value={this.state.note.title} style={input_styles} onChange={this.handleTitleChange} ref="title" />
          <br />
          <textarea value={this.state.note.body} style={textarea_styles} onChange={this.handleBodyChange} ref="body"></textarea>
        </form>
      </div>
    );
  }
});

var data = [
  {title: "Hello World", body: "This is one note"},
  {title: "Ideas", body: "This is another note. A slightly bigger note."}
];

React.render(
  <NoteApp data={data} />,
  document.getElementById('content')
);
