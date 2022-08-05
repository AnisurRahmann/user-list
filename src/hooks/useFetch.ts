import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";

interface FetchResponseData<T> {
  response: Response<T>;
  error: string | null;
  loading: boolean;
}

interface Response<T> {
  data: T | null;
  totalCount?: number;
}

const DEFAULT_RESPONSE_STATE = {
  data: null,
};

/**
 * @param endpoint endpoint to fetch data from.
 */
export function useFetch<T>(endpoint: string): FetchResponseData<T> {
  const [response, setResponse] = useState<Response<T>>(DEFAULT_RESPONSE_STATE);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let didCancelFetch = false;

    // Resets the loader and errors on subsequent calls
    setError(null);
    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}${endpoint}&inc=name,email,registered,login,gender,picture`,
          {
            headers: { AccessControlAllowOrigin: "*" },
          }
        );
        const responseJson = await res.json();

        if (!didCancelFetch) {
          const updatedResponse: Response<T> = {
            // simplified version of user data as we don't need all types of fields

            data: responseJson.results.map((result: any) => {
              return {
                lastName: result.name.last,
                firstName: result.name.first,
                email: result.email,
                registrationDate: result.registered.date,
                UserName: result.login.username,
                gender: result.gender,
                imageUrl: result.picture.thumbnail,
              };
            }),
          };

          setResponse(updatedResponse);
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      didCancelFetch = true;
    };
  }, [endpoint]);

  return { response, error, loading };
}
