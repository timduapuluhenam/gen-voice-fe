import { gql } from '@apollo/client'

export const getTotalOutstanding = gql`
subscription MySubscription($user_id: bigint = "")  {
  invoice_details_aggregate(where: {invoice: {user_id: {_eq: $user_id}}}) {
    aggregate {
      sum {
        amount
      }
    }
  }
}
`
