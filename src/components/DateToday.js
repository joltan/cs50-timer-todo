// get today's date as formatted string 

export function getDateToday(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth();
    let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    let yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    mm = months[mm];
    today = dd+' '+mm+' of '+yyyy;

    return today
}