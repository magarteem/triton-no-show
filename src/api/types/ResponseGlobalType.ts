export interface ResponseGlobalType {
 currentPage: number;
 isNextPage: boolean;
 pageSize: number;
 _prev?: any;
}

// specify the type of any data
// ... extends ResponseGlobalType {
//   results: any[]
// }
