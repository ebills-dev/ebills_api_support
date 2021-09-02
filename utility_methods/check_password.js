import fetch from "node-fetch";

const checking_password = async (password, base_url) => {
    const url = `${base_url}/gencon`;
    const rawdata = await fetch(url);
    const data = await rawdata.json();
    if (password === data){
        return true;
    }
    return false;
}

export default checking_password;