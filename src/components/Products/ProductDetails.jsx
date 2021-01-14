import React from 'react';
import axios from 'axios';
import './ProductDetails.css';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      id: this.props.match.params.product.split('-')[1],
      isOwned: false,
    };
  }

  componentDidMount() {
    this.getProduct();
    this.isOwnedCheck();
  }

  isOwnedCheck() {
    if (localStorage.getItem(this.state.id) === this.state.id) {
      this.setState({
        isOwned: true,
      });
    } else {
      this.setState({
        isOwned: false,
      });
    }
  }

  getProduct() {
    const host = process.env.REACT_APP_API_HOST;
    const slug = this.props.match.params.product;
    const id = slug.split('-')[1];
    console.log(id);
    axios
      .get(`${host}/api/emotions/${id}`)
      .then((res) => res.data)
      .then((data) => {
        this.setState({
          details: data[0],
        });
      });
  }

  render() {
    const { details, isOwned, id } = this.state;
    return (
      <main>
        <h1>{details.name}</h1>
        <img alt={details.name} src={details.image_url} />
        <div className='playerAudio'>Lecteur audio</div>
        <h2>{`Prix: ${details.price} €`}</h2>
        <button
          type='button'
          className={isOwned ? 'hideButton' : 'buyButton'}
          onClick={() => {
            localStorage.setItem(id, id);
          }}
        >
          Acheter
        </button>
        <h3>{details.description}</h3>
      </main>
    );
  }
}

export default ProductDetails;
