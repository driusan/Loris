let ProbandInfo = React.createClass(
  {
    getInitialState: function() {
      return {
        sexOptions: {
          Male: 'Male',
          Female: 'Female',
        },
        Data: [],
        formData: {},
        updateResult: null,
        errorMessage: null,
        isLoaded: false,
        loadedData: 0,
      };
    },
    componentDidMount: function() {
      this.fetchData();
    },
    fetchData: function() {
      let that = this;
      $.ajax(
        this.props.dataURL,
        {
          dataType: 'json',
          success: function(data) {
            const formData = {
              ProbandSex: data.ProbandSex,
              ProbandDoB: data.ProbandDoB,
              ProbandDoB2: data.ProbandDoB,
            };

            // Add parameter values to formData
            Object.assign(formData, data.parameter_values);

            that.setState(
              {
                formData: formData,
                Data: data,
                isLoaded: true,
              }
            );
          },
          error: function(data, errorCode, errorMsg) {
            that.setState(
              {
                error: 'An error occurred when loading the form!',
              }
            );
          },
        }
      );
    },
    setFormData: function(formElement, value) {
      let formData = JSON.parse(JSON.stringify(this.state.formData));
      formData[formElement] = value;
      this.setState(
        {
          formData: formData,
        }
      );
    },
    onSubmit: function(e) {
      e.preventDefault();
    },
    render: function() {
      if (!this.state.isLoaded) {
        if (this.state.error !== undefined) {
          return (
            <div className ="alert alert-danger text-center">
              <strong>
                {this.state.error}
              </strong>
            </div>
          );
        }

        return (
          <button className ="btn-info has-spinner">
            Loading
            <span
              className ="glyphicon glyphicon-refresh
                        glyphicon-refresh-animate"
            >
                    </span>
          </button>
        );
      }

      let disabled = true;
      let updateButton = null;
      if (loris.userHasPermission('candidate_parameter_edit')) {
        disabled = false;
        updateButton = <ButtonElement label ="Update" />;
      }

      let dobRequired = false;
      let dob2Required = false;
      if (this.state.formData.ProbandSex !== null) {
        dobRequired = true;
      }
      if (this.state.formData.ProbandDoB !== null) {
        dob2Required = true;
      }
      let extraParameterFields = [];
      let extraParameters = this.state.Data.extra_parameters;
      for (let key2 in extraParameters) {
        if (extraParameters.hasOwnProperty(key2)) {
          let paramTypeID = extraParameters[key2].ParameterTypeID;
          let name = paramTypeID;
          let value = this.state.formData[paramTypeID];

          switch (extraParameters[key2].Type.substring(0, 3)) {
            case 'enu':
              let types = extraParameters[key2].Type.substring(5);
              types = types.slice(0, -1);
              types = types.replace(/'/g, '');
              types = types.split(',');
              let selectOptions = {};
              for (let key3 in types) {
                if (types.hasOwnProperty(key3)) {
                  selectOptions[types[key3]] = types[key3];
                }
              }

              extraParameterFields.push(
                <SelectElement
                    label={extraParameters[key2].Description}
                    name={name}
                    options={selectOptions}
                    value={value}
                    onUserInput={this.setFormData}
                    ref={name}
                    disabled={disabled}
                    key={key2}
                />
            );
              break;
            case 'dat':
              extraParameterFields.push(
                <DateElement
                    label={extraParameters[key2].Description}
                    name={name}
                    value={value}
                    onUserInput={this.setFormData}
                    ref={name}
                    disabled={disabled}
                    key={key2}
                />
            );
              break;
            default:
              extraParameterFields.push(
                <TextareaElement
                    label={extraParameters[key2].Description}
                    name={name}
                    value={value}
                    onUserInput={this.setFormData}
                    ref={name}
                    disabled={disabled}
                    key={key2}
                />
            );
          }
        }
      }

      let alertMessage = '';
      let alertClass = 'alert text-center hide';
      if (this.state.updateResult) {
        if (this.state.updateResult === 'success') {
          alertClass = 'alert alert-success text-center';
          alertMessage = 'Update Successful!';
        } else if (this.state.updateResult === 'error') {
          let errorMessage = this.state.errorMessage;
          alertClass = 'alert alert-danger text-center';
          alertMessage = errorMessage ? errorMessage : 'Failed to update!';
        }
      }

      return (
        <div className="row">
          <div className={alertClass} role="alert" ref="alert-message">
            {alertMessage}
          </div>
          <FormElement
            name="probandInfo"
            onSubmit={this.handleSubmit}
            ref="form"
            class="col-md-6"
          >
            <StaticElement
              label="PSCID"
              text={this.state.Data.pscid}
            />
            <StaticElement
              label="DCCID"
              text={this.state.Data.candID}
            />
            <SelectElement
              label="Proband Sex"
              name="ProbandSex"
              options={this.state.sexOptions}
              value={this.state.formData.ProbandSex}
              onUserInput={this.setFormData}
              ref="ProbandSex"
              disabled={disabled}
              required={true}
            />
            <DateElement
              label="DoB Proband"
              name="ProbandDoB"
              value={this.state.formData.ProbandDoB}
              onUserInput={this.setFormData}
              ref="ProbandDoB"
              disabled={disabled}
              required={dobRequired}
            />
            <DateElement
              label="Confirm DoB Proband"
              name="ProbandDoB2"
              value={this.state.formData.ProbandDoB2}
              onUserInput={this.setFormData}
              ref="ProbandDoB2"
              disabled={disabled}
              required={dob2Required}
            />
            <StaticElement
              label="Age Difference (months)"
              text={this.state.Data.ageDifference.toString()}
            />
            {extraParameterFields}
            {updateButton}
          </FormElement>
        </div>
      );
    },
    /**
     * Handles form submission
     *
     * @param {event} e - Form submission event
     */
    handleSubmit: function(e) {
      e.preventDefault();
      let myFormData = this.state.formData;
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; // January is 0!
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      today = yyyy + '-' + mm + '-' + dd;
      let dob1 = myFormData.ProbandDoB ?
        myFormData.ProbandDoB : null;
      let dob2 = myFormData.ProbandDoB2 ?
        myFormData.ProbandDoB2 : null;
      if (dob1 !== dob2) {
        alert('DOB do not match!');
        return;
      }

      if (dob1 > today) {
        alert('Proband date of birth cannot be later than today!');
        return;
      }

      // Set form data
      let self = this;
      let formData = new FormData();
      for (let key in myFormData) {
        if (myFormData[key] !== '') {
          formData.append(key, myFormData[key]);
        }
      }

      formData.append('tab', this.props.tabName);
      formData.append('candID', this.state.Data.candID);
      $.ajax(
        {
          type: 'POST',
          url: self.props.action,
          data: formData,
          cache: false,
          contentType: false,
          processData: false,
          success: function(data) {
            self.setState(
              {
                updateResult: 'success',
              }
            );
            self.showAlertMessage();
            self.fetchData();
          },
          error: function(err) {
            if (err.responseText !== '') {
              let errorMessage = JSON.parse(err.responseText).message;
              self.setState(
                {
                  updateResult: 'error',
                  errorMessage: errorMessage,
                }
              );
              self.showAlertMessage();
            }
          },
        }
      );
    },
    /**
     * Display a success/error alert message after form submission
     */
    showAlertMessage: function() {
      let self = this;
      if (this.refs['alert-message'] === null) {
        return;
      }

      let alertMsg = this.refs['alert-message'];
      $(alertMsg).fadeTo(2000, 500).delay(3000).slideUp(
        500,
        function() {
          self.setState(
            {
              updateResult: null,
            }
          );
        }
      );
    },

  }
);

export default ProbandInfo;
