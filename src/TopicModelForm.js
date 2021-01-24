import React from "react";
import {Col, Form, FormGroup, Label, Input} from "reactstrap";

const TopicModelForm = (props) => {
    const models = props.models.map(
        model => {
            return <option value={model.name} selected={model.name === props.current}>{model.description}</option>
        }
    );
    return (
        <Col xs={12} sm={8} md={6} className={'my-4 text-left'}>
            <Form>
                <FormGroup>
                    <Label for="modelSelect"><h4>Select Model</h4></Label>
                    <Input type="select" name="select" id="modelSelect" onChange={props.handleSelection}>
                        {models}
                    </Input>
                </FormGroup>
            </Form>
        </Col>
    )
};

export default TopicModelForm;