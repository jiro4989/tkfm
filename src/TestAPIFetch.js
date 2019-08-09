import React, {useState, useEffect} from 'react';

const TestAPIFetch = () => {
  const [query, setQuery] = useState('redux');
  const [result, setResult] = useState('');

  // エラーになる
  useEffect(async () => {
    console.log(`query is ${query}`);
    const resp = await fetch("http://hn.algolia.com/api/v1/search?query=" + query)
    const json = await resp.json()
    setResult(JSON.stringify(json))
  }, [query])

  return (
    <div>
      <label>
        Your query is {query}.
      </label>
      <p>
        <input type='text' value={query} onChange={(evt) => setQuery(evt.target.value)} />
      </p>
      <textarea value={result} rows="20" cols="40" />
    </div>
  );
}
export default TestAPIFetch;

