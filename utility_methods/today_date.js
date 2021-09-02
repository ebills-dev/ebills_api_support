const get_today_s_date = () => {
    const today_date = new Date();

    // we're transforming dates to strings bc this way i can fix them if they're
    // not in 2digits notation => 4 bad; 04 good
    // padStart adds strings characters until we get the desired length (1st param)
    const dd = String(today_date.getDate()).padStart(2, '0');
    const mm = String(today_date.getMonth()).padStart(2, '0');
    const yyyy = today_date.getFullYear();

    return {dd, mm, yyyy};
}
export default get_today_s_date;