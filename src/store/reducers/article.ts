import { ArticleAction, ResetAction } from "./../../types/store.d"
import { ArtComment, ArticleComment, ArticleInfo } from "@/types/data.d"
type ArticleState = {
  detail: ArticleInfo
  comment: ArticleComment
}
const initialState: ArticleState = {
  detail: {},
  comment: {
    results: [] as ArtComment[],
  },
} as ArticleState

export default function article(state = initialState, action: ArticleAction | ResetAction) {
  switch (action.type) {
    case "article/get":
      return { ...state, detail: action.payload }
    case "article/getArticleComments":
      // total_count: number;
      // end_id: string | null;
      // last_id: string | null;
      // results: ArtComment[];
      const { total_count, end_id, last_id, results, actionType } = action.payload
      return {
        ...state,
        comment: {
          total_count,
          end_id,
          last_id,
          results: actionType === "replace" ? results : [...state.comment.results, ...results],
        },
      }
    case "article/addArticleComment":
      return {
        ...state,
        comment: {
          ...state.comment,
          total_count: state.comment.total_count + 1,
          results: [action.payload, ...state.comment.results],
        },
        detail: {
          ...state.detail,
          comm_count: state.detail.comm_count + 1,
        },
      }
    case "reset":
      if (action.payload === "article") {
        return initialState
      }
      return state
    default:
      return state
  }
}
