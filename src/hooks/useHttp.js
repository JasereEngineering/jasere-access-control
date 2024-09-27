import { useState } from "react";

const BASE_URL = process.env.REACT_APP_ACCESS_CONTROL_API_URL || "";
function useHttp (endpoint,componentLoadingMessage) {
  const {loadMessage,loadedMessage} = componentLoadingMessage;
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(loadMessage);
  const [error, setError] = useState(null);
    const post = async (payload) => {
        
      setLoading(true);
      setLoadingMessage( loadedMessage );
      setError(null);

      try{
        const url = `${BASE_URL}${endpoint}` || "";
        const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      const {message} = result;
      if( !response.ok ) throw new Error( message );

      return result;

      }
      catch(e){
        setError( e.message );
      }
      finally{
        setLoading( false);
        setLoadingMessage( loadMessage );

      }

    }
    const get = async() => {

      setLoading(true);
      setLoadingMessage( loadedMessage );

      try{
        const url = `${BASE_URL}${endpoint}` || "";
        const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      const {message} = result;
      if( !response.ok ) throw new Error( message );

      return result;

      }
      catch(e){
        setError( e.message );
      }
      finally{
        setLoading( false);
        setLoadingMessage( loadMessage );

      }


    }
    const put = async (payload) => {
      setLoading(true);
      setLoadingMessage( loadedMessage );
      setError(null);

      try{
        const url = `${BASE_URL}${endpoint}` || "";
        const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      const {message} = result;
      if( !response.ok ) throw new Error( message );
      return result;

      }
      catch(e){
        setError( e.message );
      }
      finally{
        setLoading( false);
        setLoadingMessage( loadMessage );
      }
    }
    return {post,get,put,error,loading,loadingMessage};
}

export default useHttp;