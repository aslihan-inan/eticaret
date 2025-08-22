
import { setRoles } from "../reducers/clientReducer";

export const fetchRoles = () => {
  return async (dispatch, getState) => {
    const { roles } = getState().client;
    if (roles.length > 0) return; // zaten var, tekrar çekme

    try {
      const res = await fetch("/roles"); // API endpoint örnek
      const data = await res.json();
      dispatch(setRoles(data));
    } catch (err) {
      console.error("Roles fetch failed:", err);
    }
  };
};
