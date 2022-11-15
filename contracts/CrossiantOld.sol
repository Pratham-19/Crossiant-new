// // SPDX-License-Identifier: SEE LICENSE IN LICENSE
// pragma solidity ^0.8.17;
// contract CrossiantToken{
//     string public name='Crossiant';
//     string public symbol='CRO';
//     uint256 public totalSupply=10000000;
//     uint256 public price=10000000000000000; //in wei 
//     address public owner;
//     mapping(address=>uint256) private _balances;
//     mapping(address=> mapping(address=>uint256)) private _allowed;
//     constructor(){
//         owner=msg.sender;
//         _balances[owner]=totalSupply;
//     }
//     event Transfer(address indexed _from,address indexed _to,uint256 _value);
//     event Approval(address indexed _owner, address indexed _spender, uint256 _value);
//     function balanceOf(address _owner) public view returns(uint256 balance){
//         return _balances[_owner];
//     } 
//     function transfer(address _to,uint256 _value) public returns(bool success){
//         require(_balances[msg.sender]>=_value,'CRO: transfer amount exceeds balance');
//         require (_to!=address(0),'CRO: transfer to the zero address');
//         _balances[msg.sender]-=_value;
//         _balances[_to]+=_value;
//         emit Transfer(msg.sender,_to,_value);
//         return true;
//     }
//     function approve(address _spender, uint256 _value) public returns (bool success){
//         require(_spender!=address(0),'CRO: approve to the zero address');
//         _allowed[msg.sender][_spender]=_value;
//         emit Approval(msg.sender,_spender,_value);
//         return true;
//     }
//     function allowance(address _owner,address _spender) public view returns(uint256 remaining){
//         return _allowed[_owner][_spender];
//     }
//     function transferFrom(address _from,address _to,uint256 _value) public returns(bool success){
//         require(_balances[_from]>=_value,'CRO: transfer amount exceeds balance');
//         // require(_allowed[_from][msg.sender]=_value,'CRO: transfer amount exceeds allowance');
//         require(_allowed[_from][msg.sender]>=_value,'CRO: transfer amount exceeds allowance');
//         require(_to!=address(0),'CRO: transfer to the zero address');
//         _balances[_from]-=_value;
//         _balances[_to]+=_value;
//         _allowed[_from][msg.sender]-=_value;
//         emit Transfer(_from,_to,_value);
//         return true;
//     }
// }

