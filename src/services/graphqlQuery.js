import { gql } from '@apollo/client'

export const getTotalOutstanding = gql`
subscription MySubscription($user_id: bigint = "") {
  invoice_details_aggregate(where: {invoice: {user_id: {_eq: $user_id}}}) {
    aggregate {
      sum {
        amount
      }
    }
  }
}
`

export const getTotalClients = gql`
subscription MySubscription($user_id: bigint = "") {
  invoice_details_aggregate(where: {invoice: {user_id: {_eq: $user_id}}}) {
    aggregate {
      count(columns: name)
    }
  }
}
`

export const getTotalCollected = gql`
subscription MySubscription($user_id: bigint = "") {
  invoice_details_aggregate(where: {invoice: {user_id: {_eq: $user_id}}, status: {_eq: "Telah Dibayar"}}) {
    aggregate {
      sum {
        amount
      }
    }
  }
}
`

export const getTotalInvoicedByTime = gql`
subscription MySubscription($today: timestamptz = "", $userId: bigint = "") {
  invoice_details(where: {created_at: {_gte: $today}, invoice: {user_id: {_eq: $userId}}}) {
    created_at
    status
    amount
  }
}
`

export const getTotalReceivedByTime = gql`
subscription MySubscription($today: timestamptz = "", $userId: bigint = "") {
  invoice_details(where: {created_at: {_gte: $today}, invoice: {user_id: {_eq: $userId}}, status: {_eq: "Telah Dibayar"}}) {
    created_at
    status
    amount
  }
}
`
export const getLatestActivity = gql`
subscription MySubscription($userId: bigint = "") {
  activities(limit: 3, order_by: {created_at: desc}, where: {user_id: {_eq: $userId}}) {
    activity
  }
}
`
export const getInvoiceNameByUserId = gql`
query MyQuery($user_id: bigint = "") {
  invoices(where: {user_id: {_eq: $user_id}}) {
    id
    name
  }
}
`
