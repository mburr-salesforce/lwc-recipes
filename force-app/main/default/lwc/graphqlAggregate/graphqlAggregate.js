import { LightningElement, wire } from 'lwc';
import { gql, graphql } from 'lightning/uiGraphQLApi';

export default class GraphqlContacts extends LightningElement {
    aggregates;

    @wire(graphql, {
        query: gql`
            query accountAggregates {
                uiapi {
                    aggregate {
                        Account {
                            edges {
                                node {
                                    aggregate {
                                        AnnualRevenue {
                                            min {
                                                displayValue
                                            }
                                            max {
                                                displayValue
                                            }
                                            avg {
                                                displayValue
                                            }
                                            count {
                                                value
                                            }
                                        }
                                        NumberOfEmployees {
                                            min {
                                                value
                                            }
                                            max {
                                                value
                                            }
                                            avg {
                                                value
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    })
    graphql;

    get numberOfAccounts() {
        return this.graphql.data?.uiapi.aggregate.Account.edges[0].node.aggregate.AnnualRevenue.count.value;
    }

    get avgAnnualRevenue() {
        return this.graphql.data?.uiapi.aggregate.Account.edges[0].node.aggregate.AnnualRevenue.avg.displayValue;
    }

    get minAnnualRevenue() {
        return this.graphql.data?.uiapi.aggregate.Account.edges[0].node.aggregate.AnnualRevenue.min.displayValue;
    }

    get maxAnnualRevenue() {
        return this.graphql.data?.uiapi.aggregate.Account.edges[0].node.aggregate.AnnualRevenue.max.displayValue;
    }

    get avgNumberOfEmployees() {
        return this.graphql.data?.uiapi.aggregate.Account.edges[0].node.aggregate.NumberOfEmployees.avg.value;
    }

    get minNumberOfEmployees() {
        return this.graphql.data?.uiapi.aggregate.Account.edges[0].node.aggregate.NumberOfEmployees.min.value;
    }

    get maxNumberOfEmployees() {
        return this.graphql.data?.uiapi.aggregate.Account.edges[0].node.aggregate.NumberOfEmployees.max.value;
    }
}
