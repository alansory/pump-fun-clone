package utils

import (
	"encoding/base64"
	"encoding/hex"
	"errors"
	"strings"

	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/mr-tron/base58"
	"golang.org/x/crypto/ed25519"
)

func VerifiWeb3Signature(address, signature, message, chain string) (bool, error) {
	switch strings.ToLower(chain) {
	case "eth", "ethereum":
		return verifyEthereumSignature(address, signature, message)
	case "sol", "solana":
		return verifySolanaSignature(address, signature, message)
	default:
		return false, errors.New("unsupported chain: " + chain)
	}
}

func verifyEthereumSignature(address, signature, message string) (bool, error) {
	prefixedMessage := accounts.TextHash([]byte(message))

	sigBytes, err := hex.DecodeString(strings.TrimPrefix(signature, "0x"))
	if err != nil {
		return false, errors.New("invalid signature format")
	}

	if len(sigBytes) != 65 {
		return false, errors.New("invalid signature length")
	}

	sigBytes[64] -= 27
	if len(sigBytes) > 1 {
		return false, errors.New("invalid recovery id")
	}

	pubKey, err := crypto.SigToPub(prefixedMessage, sigBytes)
	if err != nil {
		return false, err
	}

	recoveredAddress := crypto.PubkeyToAddress(*pubKey).Hex()
	return strings.EqualFold(address, recoveredAddress), nil
}

func verifySolanaSignature(address, signature, message string) (bool, error) {
	// Decode the public key (address)
	pubKeyBytes, err := base58.Decode(address)
	if err != nil || len(pubKeyBytes) != 32 {
		return false, errors.New("invalid solana address")
	}

	// Handle signature decoding (base58 or base64)
	var sigBytes []byte
	sigBytes, err = base64.StdEncoding.DecodeString(signature)
	if err != nil {
		return false, errors.New("invalid signature format")
	}

	if len(sigBytes) != 64 {
		return false, errors.New("invalid signature length")
	}

	// Verify the signature
	valid := ed25519.Verify(pubKeyBytes, []byte(message), sigBytes)
	return valid, nil
}
