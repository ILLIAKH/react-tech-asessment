// import axios from 'axios';

//  //Archive certain call
// export function archive(id, callback){
//     axios.post(`https://aircall-job.herokuapp.com/activities/${id}`, {
//         is_archived: true
//       })
//       .then(function (res) {
//         callback(id);
//         // handleRemove(id);
//       })
//       .catch(function (err) {
//         console.log(err);
//       });
// }

//  //Refresh all Archived Calls
// export function refreshArchivedState(callback){
//     axios.get('https://aircall-job.herokuapp.com/reset')
//         .then(res=>{
//             // callback();
//         })
//         .catch(err=>{
//             console.log(err);
//         })
// }

//Should really move all the api functions here.