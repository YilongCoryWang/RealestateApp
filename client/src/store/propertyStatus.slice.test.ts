import { updatePropertyStatus } from "./propertyStatus.slice";
import store from './index'

describe("propertyStatusSlice", ()=>{
    it("the intial property status should be 'FORSALE'", ()=>{
        const propertyStatus = store.getState().status

        expect(propertyStatus).toBe('FORSALE');
    })
    it("should update property status from 'FORSALE' to 'RENT'", ()=>{
        store.dispatch(updatePropertyStatus('RENT'))
        const propertyStatus = store.getState().status

        expect(propertyStatus).toBe('RENT');
    })
})
