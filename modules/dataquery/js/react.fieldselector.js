CategoryItem = React.createClass({displayName: 'CategoryItem',
    render: function() {
        var classList = "list-group-item";
        if(this.props.selected) {
            classList += " active";
        }
        return (
            React.createElement("a", {href: "#", className: classList, onClick: this.props.onClick}, 
                this.props.name, 
                React.createElement("span", {className: "badge"}, this.props.count)
            )
        );
    }
});

CategoryList = React.createClass({displayName: 'CategoryList',
    getInitialState: function () {
        return {
            selectedCategory: ""
        };
    },
    selectCategoryHandler: function(category) {
        var that = this;
        return function(evt) {
            if(that.props.onCategorySelect) {
                that.props.onCategorySelect(category);
            }
            that.setState({
                selectedCategory: category
            });
        };
    },
    render: function() {
        var items = [],
             selectClosure = function(name) {
                 return this.selectCategory(name);
             };
        for(i = 0; i < this.props.items.length; i += 1) {
            selected = false;
            if(this.props.items[i].category == this.state.selectedCategory) {
                selected=true;
            }
            items.push(React.createElement(CategoryItem, {
                key: this.props.items[i].category, 
                name: this.props.items[i].category, 
                count: this.props.items[i].numFields, 
                selected: selected, 
                onClick: this.selectCategoryHandler(this.props.items[i].category)}));
        }
        return (
            React.createElement("div", {className: "list-group col-md-3 col-sm-12"}, items)
            );
    }
});

OperatorValue = React.createClass({displayName: 'OperatorValue',
    preventDefault: function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    },
    render: function() {
        if(this.props.Type.indexOf('enum') === 0) {
            var optString = this.props.Type.substr(5, this.props.Type.length-6);
            var optArray  = optString.split(",");

            optArray = optArray.map(function (element) {
                var eTrim = element.trim();
                return eTrim.substr(1, eTrim.length-2);
            });
            optArray = optArray.map(function (str) {
                return React.createElement("option", {value: str}, str);
            });
            return (
                React.createElement("select", {
                    className: "queryValue", 
                    defaultValue: this.props.Value, 
                    onClick: this.preventDefault, 
                    onChange: this.props.onChange}, 
                        React.createElement("option", {value: ""}), 
                        optArray
                )
            );
        }
        return (React.createElement("input", {
                    type: "text", 
                    className: "queryValue", 
                    onClick: this.preventDefault, 
                    onChange: this.props.onChange, 
                    defaultValue: this.props.Value}
                ));
    }
});
FieldItem = React.createClass({displayName: 'FieldItem',
    changeCriteria: function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var op = this.props.Criteria;
        var state = this.state;
        if(evt.target.classList.contains("queryOperator")) {
            op.operator = evt.target.value;
        }
        if(evt.target.classList.contains("queryValue")) {
            op.value = evt.target.value;
        }

        if(this.props.onCriteriaChange) {
            this.props.onCriteriaChange(this.props.FieldName, op);
        }
    },
    render: function() {
        var classList = "list-group-item row";
        var downloadIcon = "";
        var criteria;
        if(this.props.selected) {
            classList += " active";
        }
        if(this.props.downloadable) {
            downloadIcon = React.createElement("span", {className: "glyphicon glyphicon-download-alt pull-right", title: "Downloadable File"})
        }
        // Don't display the category in the field selector
        var displayName = this.props.FieldName.substring(this.props.Category.length + 1);

        if(this.props.type === "Criteria" && this.props.selected) {
            criteria = React.createElement("span", null, 
                    React.createElement("select", {className: "queryOperator", onClick: this.changeCriteria, defaultValue: this.props.Criteria.operator}, 
                        React.createElement("option", {value: "="}, " = "), 
                        React.createElement("option", {value: "!="}, "!="), 
                        React.createElement("option", {value: "<="}, "<="), 
                        React.createElement("option", {value: ">="}, ">="), 
                        React.createElement("option", {value: "startsWith"}, "startsWith"), 
                        React.createElement("option", {value: "contains"}, "contains")
                    ), 
                    React.createElement(OperatorValue, {Type: this.props.ValueType, onChange: this.changeCriteria, Value: this.props.Criteria.value})
                );
            return (
                React.createElement("div", {className: classList, onClick: this.props.onClick}, 
                    React.createElement("h4", {className: "list-group-item-heading col-sm-12 col-md-2"}, displayName), 
                    React.createElement("span", {className: "col-sm-10 col-md-7"}, this.props.Description), 
                    React.createElement("span", {className: "col-sm-2 col-md-3"}, criteria)
                )
            );
        }

        return (
            React.createElement("div", {className: classList, onClick: this.props.onClick}, 
                React.createElement("h4", {className: "list-group-item-heading col-sm-12 col-md-2"}, displayName, criteria, downloadIcon), 
                React.createElement("span", {className: "col-sm-12 col-md-10"}, this.props.Description)
            )
        );
    }
});

FieldList = React.createClass({displayName: 'FieldList',
    getInitialState: function() {
        return {
            PageNumber: 1
        };
    },
    onFieldClick: function(fieldName) {
        var that = this;
        return function(evt) {
            if(that.props.onFieldSelect) {
                that.props.onFieldSelect(fieldName);
            }
        }
    },
    changePage: function(i) {
        this.setState({
            PageNumber: i
        });
    },
    render: function() {
        var fields = [];
        var items = this.props.items || [];
        var fieldName, desc, isFile;
        var rowsPerPage = this.props.FieldsPerPage || 20;

        var start = (this.state.PageNumber - 1) * rowsPerPage;
        var filter = this.props.Filter.toLowerCase();
        if(filter > 0) {
            start = 0;
        }

        for(var i = start; i < items.length; i += 1) {
            fieldName = items[i].key;
            fieldName = fieldName.join(",");
            desc = items[i].value.Description;
            type = items[i].value.Type || "varchar(255)";

            if(fieldName.toLowerCase().indexOf(filter) == -1 && desc.toLowerCase().indexOf(filter) == -1) {
                continue;
            }
            isFile = false;
            if(items[i].value.IsFile) {
                isFile = true;
            }

            selected=false;
            if(this.props.selected && this.props.selected.indexOf(fieldName) > -1) {
                selected=true;
            }

            var crit = undefined;
            if(this.props.Criteria && this.props.Criteria[fieldName]) {
                crit = this.props.Criteria[fieldName];
            }
            fields.push(React.createElement(FieldItem, {FieldName: fieldName, 
                Category: this.props.category, 
                Description: desc, 
                ValueType: type, 
                type: this.props.type, 
                onClick: this.onFieldClick(fieldName), 
                Criteria: crit, 
                onCriteriaChange: this.props.onCriteriaChange, 
                selected: selected, 
                downloadable: isFile}
                ));
            if(fields.length > rowsPerPage) {
                break;
            }
        }

        return (
            React.createElement("div", {className: "list-group col-md-9 col-sm-12"}, 
                fields, 
                React.createElement(PaginationLinks, {total: items.length, Active: this.state.PageNumber, onChangePage: this.changePage, RowsPerPage: rowsPerPage})
            )
            );
    }
});

FieldSelector = React.createClass({displayName: 'FieldSelector',
    propTypes: {
        selectedFields: React.PropTypes.array
    },
    getInitialState: function() {
        return {
            filter: "",
            selectedCategory: "",
            categoryFields: {
            }
        };
    },
    onFieldSelect: function(fieldName) {
        var fields = this.props.selectedFields;
        var idx = fields.indexOf(fieldName);

        if(idx > -1) {
            fields.splice(idx, 1);
            if(this.props.onFieldChange) {
                this.props.onFieldChange("remove", fieldName);
            }
        } else {
            fields.push(fieldName);
            if(this.props.onFieldChange) {
                this.props.onFieldChange("add", fieldName);
            }
        }
    },
    onCategorySelect: function(category) {
        var that=this;

        // Use the cached version if it exists
        if(this.state.categoryFields[category]) {
        } else {
            // Retrieve the data dictionary
            $.get("AjaxHelper.php?Module=dataquery&script=datadictionary.php", { category: category}, function(data) {
                var cf = that.state.categoryFields;
                cf[category] = data;
                that.setState({
                    categoryFields: cf
                });
            }, 'json');
        }
        this.setState({
            selectedCategory: category
        });
    },
    filterChange: function(evt) {
        this.setState({
            filter: evt.currentTarget.value
        });
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("h1", {className: "col-md-10"}, this.props.title), 
                    React.createElement("div", {className: "col-md-2 block"}, 
                        React.createElement("label", null, "Search:"), React.createElement("input", {type: "text", onChange: this.filterChange})
                    )
                ), 
                React.createElement(CategoryList, {
                    items: this.props.items, 
                    onCategorySelect: this.onCategorySelect}
                ), 
                React.createElement(FieldList, {
                    items: this.state.categoryFields[this.state.selectedCategory], 
                    type: this.props.type, 
                    category: this.state.selectedCategory, 
                    Criteria: this.props.Criteria, 
                    onFieldSelect: this.onFieldSelect, 
                    onCriteriaChange: this.props.onCriteriaChange, 
                    FieldsPerPage: "15", 
                    selected: this.props.selectedFields || [], 
                    Filter: this.state.filter}
                )
            )
        );
    }
});
