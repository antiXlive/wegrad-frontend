const INITIAL_STATE = {
   newsFeed: null,
   fetchingNew: true,
   fetchingOld: false,
   noMorePosts: false,
};

const postReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_NEWS_FEED":
         return {
            ...state,
            newsFeed: action.payload,
         };
      case "FILTER_NEWS_FEED":
         return {
            ...state,
            newsFeed: state.newsFeed.filter(
               (post) => post._id !== action.payload
            ),
         };
      case "APPEND_NEWS_FEED":
         return {
            ...state,
            newsFeed: [action.payload, ...state.newsFeed],
         };
      case "APPEND_NEWS_FEED_OLD":
         return {
            ...state,
            newsFeed: [...state.newsFeed, ...action.payload],
         };
      case "FETCHING_NEW":
         return {
            ...state,
            fetchingNew: action.payload,
         };
      case "FETCHING_OLD":
         return {
            ...state,
            fetchingOld: action.payload,
         };
      case "NO_MORE_POSTS":
         return {
            ...state,
            noMorePosts: true,
         };
      default:
         return state;
   }
};

export default postReducer;
