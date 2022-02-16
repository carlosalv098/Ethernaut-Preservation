const { expect } = require("chai");
const { deploy } = require("../scripts/helpful_scripts");

describe("Preservation", function () {
  it("Get ownership of the Preservation smart contract", async function () {

    const [owner_preservation, new_owner_preservation] = await ethers.getSigners();

    const [, libraryContract1] = await deploy("LibraryContract");
    const [, libraryContract2] = await deploy("LibraryContract");

    const [, preservation] = await deploy("Preservation", libraryContract1.address, libraryContract2.address);

    const [, attackPreservation] = await deploy("AttackPreservation");

    let current_owner_preservation = await preservation.owner();
    console.log(`\n current owner of Preservation is ${current_owner_preservation}`);
    expect(current_owner_preservation).to.equal(owner_preservation.address);

    await preservation.connect(new_owner_preservation).setFirstTime(attackPreservation.address);
    // 123 here is irrelevant
    await preservation.connect(new_owner_preservation).setFirstTime(123);

    current_owner_preservation = await preservation.owner();
    expect(current_owner_preservation).to.equal(new_owner_preservation.address);
    console.log(` new current owner of Preservation is ${current_owner_preservation}`);
  });
});
