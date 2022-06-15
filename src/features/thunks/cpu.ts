import { partsActions } from '../parts/partsSlice';
import axios from 'axios';

export const fetchCpuData = (key: string) => {
  return async (dispatch: any) => {
    const fetchCpu = async () => {
      await axios
        .get(
          `https://pcpartsdata-default-rtdb.firebaseio.com/cpu.json?auth=${key}`
        )
        .then((res) => {
          if (res.status !== 200) {
            dispatch(
              partsActions.error({
                status: true,
                message: 'ERROR FETCHING CPU DATA',
              })
            );
          } else {
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
