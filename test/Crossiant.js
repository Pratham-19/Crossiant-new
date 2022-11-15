// const { ethers } = require("hardhat") -> optional as already globally available in hardhat;
const { expect} = require("chai");
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
describe("Crossiant contract", function () {
    async function deployTokenFixture(){
        const [owner,addr1,addr2,addr3] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");

        const crossiant = await Token.deploy();

        await crossiant.deployed();
        return {crossiant,owner,addr1,addr2,addr3};

    }
describe("Deployment", function () {
    it("Should assign the correct owner", async function (){
        const  { crossiant,owner } = await loadFixture(deployTokenFixture);
        expect(await crossiant.owner()).to.equal(owner.address);
    });
    
    it("Should transfer all tokens to owner.", async function (){
        const  { crossiant,owner } = await loadFixture(deployTokenFixture);
        const ownerBalance=await crossiant.balanceOf(owner.address);
        expect(await crossiant.totalSupply()).to.equal(ownerBalance);
    });
});
describe("Transactions", function () {
    it("Should transfer tokens from owner to user.", async function (){
        const  { crossiant,addr1 } = await loadFixture(deployTokenFixture);
        await crossiant.transfer(addr1.address,20);
        expect(await crossiant.balanceOf(addr1.address)).to.equal(20);
    });
    it("Should change the balance after transaction",async function(){
        const { crossiant,addr1,addr2,owner } = await loadFixture(deployTokenFixture);
        await crossiant.transfer(addr1.address,50);
        await crossiant.connect(addr1).transfer(addr2.address,20);
        expect(await crossiant.balanceOf(addr1.address)).to.equals(30);
        expect(await crossiant.balanceOf(addr2.address)).to.equals(20);
        expect(await crossiant.balanceOf(owner.address)).to.equals(9999950);
    });
    it("Should transfer tokens from one user to another user.", async function (){
        const  { crossiant,addr1,addr2 } = await loadFixture(deployTokenFixture);
        await crossiant.transfer(addr1.address,20);
        await crossiant.connect(addr1).transfer(addr2.address,5);
        expect(await crossiant.balanceOf(addr2.address)).to.equal(5);
    });
    it("Should fail if the amount is greater than balance & set to default balance.", async function (){
        const  { crossiant,addr1,addr2 } = await loadFixture(deployTokenFixture);
        await crossiant.transfer(addr1.address,10);
        const initialBalanceAddr1=await crossiant.balanceOf(addr1.address);
        const initialBalanceAddr2=await crossiant.balanceOf(addr2.address);
        await expect(crossiant.connect(addr1).transfer(addr2.address,20)).to.be.revertedWith("CRO: transfer amount exceeds balance");
        expect(await crossiant.balanceOf(addr1.address)).to.equals(initialBalanceAddr1);
        expect(await crossiant.balanceOf(addr2.address)).to.equals(initialBalanceAddr2);
    });
    it('Should emit transfer event when token is tranfered.', async function (){
        const { crossiant,addr1,owner }= await loadFixture(deployTokenFixture);
        await expect(crossiant.transfer(addr1.address,20)).to.emit(crossiant,"Transfer").withArgs(owner.address,addr1.address,20);

    });
    it('Should approve transfer from account of a user by another user.', async function (){
        const { crossiant,addr1,addr2,addr3 }= await loadFixture(deployTokenFixture);
        await crossiant.transfer(addr1.address,50);
        await crossiant.connect(addr1).approve(addr2.address,20);
        await crossiant.connect(addr2).transferFrom(addr1.address,addr3.address,10);
        expect(await crossiant.balanceOf(addr1.address)).to.equals(40);
    });
    it('Should emit approval event when transfering from account of a user by another user.', async function (){
        const { crossiant,addr1,addr2,addr3 }= await loadFixture(deployTokenFixture);
        await crossiant.transfer(addr1.address,50);
        await expect(crossiant.connect(addr1).approve(addr2.address,20)).to.emit(crossiant,"Approval").withArgs(addr1.address,addr2.address,20);
    });
    it('Should emit transfer event when transfering from account of a user by another user.', async function (){
        const { crossiant,addr1,addr2,addr3 }= await loadFixture(deployTokenFixture);
        await crossiant.transfer(addr1.address,50);
        await crossiant.connect(addr1).approve(addr2.address,20);
        await expect(crossiant.connect(addr2).transferFrom(addr1.address,addr3.address,10)).to.emit(crossiant,"Transfer").withArgs(addr1.address,addr3.address,10);
    });
    it('Should fail if the amount is greater than allowance & set to default balance.', async function (){
        const { crossiant,addr1,addr2,addr3 }= await loadFixture(deployTokenFixture);
        await crossiant.transfer(addr1.address,50);
        await crossiant.connect(addr1).approve(addr2.address,20);
        await expect(crossiant.connect(addr2).transferFrom(addr1.address,addr3.address,30)).to.be.revertedWith("CRO: transfer amount exceeds allowance");
        expect(await crossiant.balanceOf(addr1.address)).to.equals(50);
    }
    );
    it('Should fail if the amount is greater than balance & set to default balance.', async function (){
        const { crossiant,addr1,addr2,addr3 }= await loadFixture(deployTokenFixture);
        await crossiant.transfer(addr1.address,50);
        await crossiant.connect(addr1).approve(addr2.address,30);
        await expect(crossiant.connect(addr2).transferFrom(addr1.address,addr3.address,60)).to.be.revertedWith("CRO: transfer amount exceeds balance");
        expect(await crossiant.balanceOf(addr1.address)).to.equals(50);
    }
    );
    it("Should give the correct allowance for a user.", async function (){
        const { crossiant,addr1,addr2 }= await loadFixture(deployTokenFixture);
        await crossiant.transfer(addr1.address,50);
        await crossiant.connect(addr1).approve(addr2.address,20);
        expect(await crossiant.allowance(addr1.address,addr2.address)).to.equals(20);
    });
    // it('Should fail if the sender is not approved by the owner.', async function (){
    //     const { crossiant,addr1,addr2,addr3 }= await loadFixture(deployTokenFixture);
    //     await crossiant.transfer(addr1.address,50);
    //     await expect(crossiant.connect(addr2).transferFrom(addr1.address,addr3.address,10)).to.be.revertedWith("CRO: transfer sender is not approved");
    // });
});
});