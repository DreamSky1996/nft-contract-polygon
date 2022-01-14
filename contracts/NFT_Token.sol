// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IBurnNFT {
  function burn(uint256 tokenId) external;
}

contract NFT_TOKEN is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string public baseURI;
  uint256 public cost = 0.07 ether;
  uint256 public costOfMintableToken = 4000 ether;
  uint256 public maxSupply = 5000;
  uint256 public maxMintAmount = 20;
  bool public paused = false;

  uint256 private ETH_MAX_SUPPY = 1880;
  uint256 private ERC20_MAX_SUPPY = 3120;

  uint256 private eth_supply = 0;
  uint256 private erc20_supply = 0;

  address public mintableToken;
  address public burnNFT;

  event WithdrawalERC20(uint256 amount);

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI,
    address _mintableToken,
    address _burnNFT
  ) ERC721(_name, _symbol) {
    require(_mintableToken != address(0));
    require(_burnNFT != address(0));
    setBaseURI(_initBaseURI);
    mintableToken = _mintableToken;
    burnNFT = _burnNFT;
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // public
  function mintETH(address _to, uint256 _mintAmount) public payable {
    uint256 supply = totalSupply();
    require(!paused);
    require(_mintAmount > 0);
    require(_mintAmount <= maxMintAmount);
    require(supply + _mintAmount <= maxSupply);
    require(eth_supply + _mintAmount <= ETH_MAX_SUPPY);

    if (msg.sender != owner()) {
      require(msg.value >= cost * _mintAmount);
    }

    for (uint256 i = 1; i <= _mintAmount; i++) {
      _safeMint(_to, supply + i);
      eth_supply = eth_supply + 1;
    }
  }

  // public
  function mintERC20(
    address _to,
    uint256 _mintAmount,
    uint256 _burnTokenId
  ) public {
    uint256 supply = totalSupply();
    require(!paused);
    require(_mintAmount > 0);
    require(_mintAmount <= maxMintAmount);
    require(supply + _mintAmount <= maxSupply);
    require(erc20_supply + _mintAmount <= ERC20_MAX_SUPPY);

    IERC20(mintableToken).transferFrom(
      msg.sender,
      address(this),
      costOfMintableToken
    );
    IBurnNFT(burnNFT).burn(_burnTokenId);

    for (uint256 i = 1; i <= _mintAmount; i++) {
      _safeMint(_to, supply + i);
      erc20_supply = erc20_supply + 1;
    }
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return
      bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(baseURI, tokenId.toString()))
        : "";
  }

  // only owner
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setCostOfMintableToken(uint256 _newCost) public onlyOwner {
    costOfMintableToken = _newCost;
  }

  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }

  function withdraw() public payable onlyOwner {
    require(payable(msg.sender).send(address(this).balance));
  }

  function withdrawECR20() public onlyOwner {
    uint256 amount = IERC20(mintableToken).balanceOf(address(this));
    IERC20(mintableToken).transfer(msg.sender, amount);
    emit WithdrawalERC20(amount);
  }
}
