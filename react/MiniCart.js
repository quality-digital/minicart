import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import orderFormQuery from './graphql/orderFormQuery.gql'
import MiniCartItem from './MiniCartItem'
import Button from '@vtex/styleguide/lib/Button'
import { Price } from '@vtex/product-details'
import Spinner from '@vtex/styleguide/lib/Spinner'

/**
 * Minicart component
 */
class MiniCart extends Component {
  onRemoveItem = () => {
    console.log('Remove item')
  }

  renderWithoutProducts = (label) => {
    return (
      <div className="minicart-item pa4 shadow-4 flex items-center justify-center">
        <span className="f5">{label}</span>
      </div>
    )
  }

  renderMiniCartWithItems = (orderForm, label) => {
    return (
      <div className="pa4 shadow-3">
        {orderForm.items.map(item => (
          <div className="flex flex-row" key={item.id}>
            <MiniCartItem
              imageUrl={item.imageUrl}
              name={item.name}
              sellingPrice={item.sellingPrice}
              listPrice={item.listPrice}
              skuName={item.skuName}
              callback={this.onRemoveItem} />
            <hr />
          </div>
        ))}
        <div className="relative">
          <Button primary>{label}</Button>
          <div className="fr mt2 mr5">
            <Price
              sellingPrice={orderForm.value}
              listPrice={orderForm.value}
              showLabels={false}
              showListPrice={false} />
          </div>
        </div>
      </div>
    )
  }

  renderLoading = () => {
    return (
      <div className="minicart-item shadow-3 pa4 flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  render() {
    const { data, labelMiniCartEmpty, labelButton } = this.props
    let content
    console.log(data)
    if (data.loading) {
      content = this.renderLoading()
    } else if (!data.orderForm.length) {
      content = this.renderWithoutProducts(labelMiniCartEmpty)
    } else {
      content = this.renderMiniCartWithItems(data.orderForm, labelButton)
    }
    return content
  }
}

MiniCart.propTypes = {
  /* Informations about order form */
  data: PropTypes.object.isRequired,
  /* Label to appear when the minicart is empty */
  labelMiniCartEmpty: PropTypes.string.isRequired,
  /* Label to appear in the finish shopping button */
  labelButton: PropTypes.string.isRequired,
}

export default graphql(orderFormQuery)(MiniCart)
