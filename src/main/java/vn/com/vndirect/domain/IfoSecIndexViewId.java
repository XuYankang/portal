package vn.com.vndirect.domain;

/**
 * IfoSecIndexViewId generated by MyEclipse - Hibernate Tools
 */

@SuppressWarnings("serial")
public class IfoSecIndexViewId extends BaseBean implements java.io.Serializable {

	// Fields

	private String symbol;
	private String indexName;

	// Constructors

	/** default constructor */
	public IfoSecIndexViewId() {
	}

	/** full constructor */
	public IfoSecIndexViewId(String symbol, String indexName) {
		this.symbol = symbol;
		this.indexName = indexName;
	}

	// Property accessors

	public String getSymbol() {
		return this.symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getIndexName() {
		return this.indexName;
	}

	public void setIndexName(String indexName) {
		this.indexName = indexName;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof IfoSecIndexViewId))
			return false;
		IfoSecIndexViewId castOther = (IfoSecIndexViewId) other;

		return ((this.getSymbol() == castOther.getSymbol()) || (this.getSymbol() != null && castOther.getSymbol() != null && this.getSymbol().equals(castOther.getSymbol())))
				&& ((this.getIndexName() == castOther.getIndexName()) || (this.getIndexName() != null && castOther.getIndexName() != null && this.getIndexName().equals(castOther.getIndexName())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + (getSymbol() == null ? 0 : this.getSymbol().hashCode());
		result = 37 * result + (getIndexName() == null ? 0 : this.getIndexName().hashCode());
		return result;
	}

}