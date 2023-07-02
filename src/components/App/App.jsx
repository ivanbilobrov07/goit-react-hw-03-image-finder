import { Component } from 'react';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import css from './App.module.css';

export class App extends Component {
  state = {
    topic: null,
  };

  getImagesTopic = topic => {
    this.setState({ topic });
  };

  render() {
    const { topic } = this.state;

    return (
      <section className={css.App}>
        <Searchbar getImagesTopic={this.getImagesTopic}></Searchbar>
        <ImageGallery topic={topic}></ImageGallery>
      </section>
    );
  }
}
