export const getDateHourNow = () => {
    const dataReloj = new Date();
    const hora = dataReloj.toLocaleTimeString().split(':');
    const fechaHoraHoy = dataReloj.getDate() + "/" + (dataReloj.getMonth() + 1).toString().padStart(2, '0') + "/" + dataReloj.getFullYear()
            + " " + hora[0].toString().padStart(2, '0') + ":" + hora[1].toString() + ":" + hora[2].toString();
    return fechaHoraHoy;
}