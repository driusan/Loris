import React, {Component} from 'react';
import Loader from 'Loader';
import FilterForm from 'FilterForm';
import {Tabs, TabPane} from 'Tabs';

import MediaUploadForm from './uploadForm';

class MediaIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      filter: {},
    };

    // Bind component instance to custom methods
    this.fetchData = this.fetchData.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.formatColumn = this.formatColumn.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  /**
   * Retrieve data from the provided URL and save it in state
   * Additionally add hiddenHeaders to global loris variable
   * for easy access by columnFormatter.
   */
  fetchData() {
    $.ajax(this.props.DataURL, {
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        this.setState({
          Data: data,
          isLoaded: true,
        });
      }.bind(this),
      error: function(error) {
        console.error(error);
      },
    });
  }

  updateFilter(filter) {
    this.setState({filter});
  }

  resetFilters() {
    this.refs.mediaFilter.clearFilter();
  }

  /**
   * Modify behaviour of specified column cells in the Data Table component
   * @param {string} column - column name
   * @param {string} cell - cell content
   * @param {array} rowData - array of cell contents for a specific row
   * @param {array} rowHeaders - array of table headers (column names)
   * @return {*} a formated table cell for a given column
   */
  formatColumn(column, cell, rowData, rowHeaders) {
    const hiddenHeaders = ['Cand ID', 'Session ID', 'Hide File', 'File Type'];

    // If a column if set as hidden, don't display it
    if (hiddenHeaders.indexOf(column) > -1) {
      return null;
    }

    // Create the mapping between rowHeaders and rowData in a row object.
    let row = {};
    rowHeaders.forEach(function(header, index) {
      row[header] = rowData[index];
    }, this);

    // create array of classes to be added to td tag
    let classes = [];
    if (row['Hide File'] === '1') {
      classes.push('bg-danger');
    }

    // convert array to string, with blank space separator
    classes = classes.join(' ');

    const hasWritePermission = loris.userHasPermission('media_write');
    if (column === 'File Name' && hasWritePermission === true) {
      let downloadURL = loris.BaseURL + '/media/ajax/FileDownload.php?File=' + encodeURIComponent(row['File Name']);
      return (
        <td className= {classes}>
          <a href={downloadURL} target="_blank" download={row['File Name']}>
            {cell}
          </a>
        </td>
      );
    }

    if (column === 'Visit Label') {
      if (row['Cand ID'] !== null && row['Session ID']) {
        let sessionURL = loris.BaseURL + '/instrument_list/?candID=' +
          row['Cand ID'] + '&sessionID=' + row['Session ID'];
        return <td className={classes}><a href={sessionURL}>{cell}</a></td>;
      }
    }

    if (column === 'Edit Metadata') {
      let editURL = loris.BaseURL + '/media/edit/?id=' + row['Edit Metadata'];
      return <td className={classes}><a href={editURL}>Edit</a></td>;
    }

    return <td className={classes}>{cell}</td>;
  }

  render() {
    // Waiting for async data to load
    if (!this.state.isLoaded) {
      return (
        <Loader/>
      );
    }

    let uploadTab;
    let tabList = [
      {id: 'browse', label: 'Browse'},
    ];

    if (loris.userHasPermission('media_write')) {
      tabList.push({id: 'upload', label: 'Upload'});
      uploadTab = (
        <TabPane TabId={tabList[1].id}>
          <MediaUploadForm
            DataURL={`${loris.BaseURL}/media/ajax/FileUpload.php?action=getData`}
            action={`${loris.BaseURL}/media/ajax/FileUpload.php?action=upload`}
            maxUploadSize={this.state.Data.maxUploadSize}
          />
        </TabPane>
      );
    }
    return (
      <Tabs tabs={tabList} defaultTab='browse' updateURL={true}>
        <TabPane TabId={tabList[0].id}>
          <FilterForm
            Module='media'
            name='media_filter'
            id='media_filter_form'
            ref='mediaFilter'
            columns={3}
            formElements={this.state.Data.form}
            onUpdate={this.updateFilter}
            filter={this.state.filter}
          >
            <br/>
            <ButtonElement label='Clear Filters' type='reset' onUserInput={this.resetFilters}/>
          </FilterForm>
          <StaticDataTable
            Data={this.state.Data.Data}
            Headers={this.state.Data.Headers}
            Filter={this.state.filter}
            getFormattedCell={this.formatColumn}
            freezeColumn="File Name"
          />
        </TabPane>
        {uploadTab}
      </Tabs>
    );
  }
}

$(function() {
  const mediaIndex = (
    <div className='page-media'>
      <MediaIndex DataURL={`${loris.BaseURL}/media/?format=json`} />
    </div>
  );

  ReactDOM.render(mediaIndex, document.getElementById('lorisworkspace'));
});
