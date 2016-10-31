import {checkDomain} from "../api/validaton";

export default  {
    isDomainValid: (state) => state.domain.length && checkDomain(state.domain)
}