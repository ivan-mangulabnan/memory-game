import { useState, useEffect, useRef } from "react";

export function useFetchedGifs(query) {
  const cache = useRef(new Map());
  const [status, setStatus] = useState({status: 'loading', data: null});

  const normalizedQuery = query?.trim().replace(/\s+/g, " ");

  useEffect(() => {
    if (!normalizedQuery) return;

    if (cache.current.has(normalizedQuery)) {
      setStatus({status: 'success', data: cache.current.get(normalizedQuery)});
      return;
    }

    async function fetchGif() {
      setStatus({status: 'loading', data: null});
      try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=n7nPzbRXXO1GAeYAOo1ah2qJWpSDDle6&q=${encodeURIComponent(normalizedQuery)}&limit=12`);
        const result = await response.json();

        if (result.data.length < 12) {
          cache.current.set(normalizedQuery, []);
          setStatus({status: 'empty', data: null});
          return;
        }

        cache.current.set(normalizedQuery, result.data);
        setStatus({status: 'success', data: result.data});
      } catch (err) {
        setStatus({status: 'error', data: null});
      }
    }

    fetchGif();
  }, [normalizedQuery]);

  return status;
}