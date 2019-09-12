import React, {useState} from 'react';

const TestTextInput = () => {
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <h2>TestTextInput</h2>
      <hr />
      <p>Your text is =={text}== .</p>
      <input type="text" value={text} onChange={(evt) => setText(evt.target.value)} />
      <p>
        <label>
          Check box state is {checked + ""}.
        <input type="checkbox" checked={checked} onChange={(evt) => setChecked(!checked)} />
        </label>
      </p>
    </div>
  );
}
export default TestTextInput;
