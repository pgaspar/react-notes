/* jshint esnext:true, browser: true */

import React from 'react';
import NoteApp from './components/note-app.jsx';

var data = [
  {title: "Hello World", body: "This is one note"},
  {title: "Ideas", body: "This is another note. A slightly bigger note."}
];

React.render(
  <NoteApp data={data} />,
  document.getElementById('content')
);
