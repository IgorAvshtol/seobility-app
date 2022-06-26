import { useState } from 'react';

import { TypeLoadingStatus, IUser } from 'components/interfaces';

export const usePostData = <T>(url?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<TypeLoadingStatus>(TypeLoadingStatus.IS_RESOLVE);
  const [errorResponse, setErrorResponse] = useState(false);

  const sendData = async (payload: IUser) => {
    setLoading(TypeLoadingStatus.IS_PENDING);
    try {
      const response = await fetch(url!, {
        method: 'POST',
        body: JSON.stringify({
          ...payload
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      setLoading(TypeLoadingStatus.IS_RESOLVE);
      const responseData = await response.json();
      setData(responseData);
    } catch (e) {
      setLoading(TypeLoadingStatus.IS_REJECTED);
      setErrorResponse(true);
    }
  };

  return { data, loading, setLoading, errorResponse, getResponseData: sendData };
};
