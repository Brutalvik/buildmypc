import { partsActions } from '../parts/partsSlice';
import axios from 'axios';

export const fetchCpuData = (key: string, selection: string) => {
  return async (dispatch: any) => {
    const fetchCpu = async () => {
      await axios
        .get(
          `https://pcpartsdata-default-rtdb.firebaseio.com/${selection}.json?auth=${key}`
        )
        .then((res) => {
          if (res.status !== 200) {
            dispatch(
              partsActions.error({
                status: true,
                message: 'ERROR FETCHING DATA',
              })
            );
          } else {
            console.log(res);
            dispatch(partsActions.cpu(res.data));
          }
        });
    };
    try {
      fetchCpu();
    } catch (error) {
      throw new Error(
        dispatch(
          partsActions.error({
            status: true,
            message: 'SOMETHING WENT WRONG!',
          })
        )
      );
    }
  };
};
